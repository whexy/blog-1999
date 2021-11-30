---
title: Asynchronous Mutex
tags: Coding
date: "2021-09-05"
---

Asynchronous programs can also be applied on multi-thread system through "thread pool". However, using mutex in it might be a problem.

<!-- more -->

Here is the example from Jon Gjengset's live stream ["Crust of Rust: async/await"](https://www.youtube.com/watch?v=ThjvMReOXYM&t=1437s).

```rust
async fn main() {
  let x = Arc::new(Mutex::new(0));
  let x1 = Arc::clone(&x);
  tokio::spawn(async move {
    loop {
      let x = x1.lock();
      tokio::fs::read_to_string("file").await;
      *x += 1;
      // the lock of x is automatically droped here
    }
  });
  let x2 = Arc::clone(&x);
  tokio::spawn(async move {
    loop {
      *x2.lock() -= 1;
    }
  });
}
```

Two spawned asynchronous functions are going to change the value in `x`. 

Using `spawn` allows us to execute the asynchronous functions simultaneously (creating two event loops). Thus we must use Mutex to protect the value of `x`. But `spawn` may not give us another thread to run the program since it is "smart". It will decide whether to create another thread to do that or still using the existing one.

Let's say this time; the `spawn` decides to run the program in just one thread. When the line 7 `tokio::fs::read_to_string("file").await;` gets executed, the function will yield and get back to the executor (tokio runtime). Then, the executor decides to execute the function in line 15 `*x2.lock() -= 1;`. Now we encounter a **deadlock**. The control flow looks like this.

```rust
let x = x1.lock(); // async func 1 get the lock
tokio::fs::read_to_string("file").await; // func 1 yields!

// tokio runtime stores the context and switch to func 2

*x2.lock() -= 1; // async func 2 tries to get the lock but fails;
// the thread is blocked.
```

`x2` will wait for the lock to be released. Interestingly, the Operating System never thought that a thread could be executed in such behavior. Usually, the locks are valid among the threads. And once a thread tries to get the lock, the Operating System will block it until the lock is released.

In this specific case, the lock should be released by the thread itself! However, the thread is blocked by the OS, so the lock will never be released! The main reason is that the thread is preemptive scheduled, while the asynchronous functions are cooperate scheduled. The lock is invented for preemptive scheduling patterns.

So this story teaches us that we should be careful with Mutex in asynchronous programming. If you want to use `std::Mutex` in asynchronous programs, you should never let an await go inside the critical section.

---
title : "Stop Forkin' Around: Faster Creating of Large Processes on Linux"
date: "2021-11-04"
tags:
	- Coding
image: https://whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com/uPic/46ktn0.jpg
---

Forking is how a process in Linux is created. Even though the fork has been improved over the years to use the COW (copy-on-write) semantics, it still has to copy a certain amount of data from parent to child. Some students in the lab are working with a fuzzing machine, and they encounter some problems...

<!-- more -->

**TL;DR**

- Use `posix_spawn()` to replace `fork()` if you want to launch a new program.
- Use Pool to avoid time-consuming PT copying if you want to have multiple processes running simultaneously around a huge task.

## Forking is slow

Some students in the lab are working with a fuzzing machine. Fuzzing launches applications thousands of times with mutated input to see if a bug is triggered.

<Warn content={`It sounds like raping the application with high computing power, just like what deep learning does to user data. `} />

What bothered us is that launching the target application takes more and more time as the fuzzing goes. We sampled the program and found the most time-consuming part is the `fork()` system call. It turned out that the fuzzing process, collecting running information of every launch, grows larger and larger in the memory. When the process bloats to a certain level, cloning becomes a performance impact factor that we cannot ignore.

We know that `fork()` has been under optimization for decades. It now uses the COW (copy-on-write) semantics, which means no data in the user space would be copied until modified. But still, it has to copy a certain amount of data from parent to child.

## Pool and Spawn

We immediately thought that dynamic language interpreters face the same problem as we do. Along with the execution of the program, the interpreter process also experiences memory bloat. If they choose to create a new process, it can be pretty expensive. We investigated several solutions offered by Python in the face of multiprocess programs. Two of the most representative solutions are considered: pool and spawn.

### Pool

The process pooling technique is a straightforward solution. It creates several empty processes at program initialization before the process grows too large and then assigns tasks to the processes for execution when needed. After the execution is finished, the processes are recycled to the pool to be used. [^1]

![](https://whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com/uPic/HzXTFG.jpg)

**Limitation**

1. We must determine the number of concurrent processes required in advance. If I want to run 100 processes concurrently and find the pool only has five available, the program must stop and wait until running processes are freed and recycled.
2. For processes that have been replaced with a brand new task by `exec()`, we cannot recycle it into the pool. That means we will lose the process forever.

**Summary**: Pooling techniques should be used for multitasking, especially for the initialization of multiprocess programs. However, it should not be used to launch other processes quickly.

### Spawn

When launching other processes with `exec()`, we know that the copying in the `fork()` is unnecessary since the child process is immediately replaced with a new one. So what exactly does it copy? Well, the most prominent part is **the page table**. The page table is the part that Linux must copy to implement COW. It records whether the data in a particular memory address has been modified or not.

![](https://whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com/uPic/So9GLk.jpg)

#### vfock()

The Berkeley version of Unix (BSD) introduced the`vfork()` system call in the early 1980s. `vfork(2)` does not copy the parent process to the child. Both processes share the parent's virtual address space; the parent is suspended until the child exits or calls `exec()` [^2]

![](https://whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com/uPic/FwRw4r.jpg)

<Callout title={`🤔 Deadlock`}>
It was discovered that `vfork()` might introduce a new problem when the application has multiple threads running: deadlock. The deadlock can happen due to the dynamic linker `ld.so.1` involvement in resolving the necessary symbols. Particularly, suppose the child process calls an external function (such as `exec()`). In that case, the dynamic linker may be invoked to resolve the Procedure Linkage Table (PLT) entry, for which the dynamic linker will acquire a mutex lock. This lock may already be held by a different thread in the parent process. If this happens, it will create a deadlock between the parent and child processes because the parent is suspended until the child has called `exec()` or `exit()`. As a result, both the parent and the child processes will hang.
I found it quite interesting because I just met the same problem when writing asynchronized programs in Rust. See my post [Asynchronous Mutex](http://whexy.com/posts/asynchronous/).
</Callout>

#### posix_spawn()

On Linux, `posix_spawn()` is just implemented with `fork()` and `exec()`. It will use `vfork()` instead of `fork()` if it is safe. You can use `posix_spawn(2)` with the `POSIX_SPAWN_USEVFORK` flag to avoid the overhead of copying page tables when forking from a large process, while Linux can protect you from the deadlock we mentioned above.

This is the solution we finally adopted. It enables fast creation of new processes, avoids invalid copies of fork, and eliminates the need to create processes in advance, regardless of the pool size.

[^1]: [Multi-processing in Python; Process vs Pool | by Nikhil Verma | Medium](https://lih-verma.medium.com/multi-processing-in-python-process-vs-pool-5caf0f67eb2b)
[^2]: [Minimizing Memory Usage for Creating Application Subprocesses (archive.org)](https://web.archive.org/web/20190922113430/https://www.oracle.com/technetwork/server-storage/solaris10/subprocess-136439.html)

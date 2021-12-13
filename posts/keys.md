---
title: "How to prove I am me: a digital way"
date: "2021-12-13"
image: "/images/digital-signature.png"
---

I published my keys on the website yesterday. It contains two kinds of keys: PGP and SSH. Both of them are public keys in the asymmetric encryption algorithm RSA. I'll show how to use these keys to prove I am me.

<!-- more -->

How to prove I am me? The question is actually asked by my Chinese teacher in high school, Ms. Bin (滨, alongside the water), who also taught us about philosophy. You may have heard about Descartes' basic axiom "Cogito ergo sum" (I think, therefore I am), which I believe is the best answer. Unfortunately, instead of continuing my studies in philosophy, I turned to computer science, which, unlike metaphysics, is a rigorous positivist discipline.

Here we met a totally different challenge. I want to publish a file to the Internet, ensuring the content is complete without any unauthorized modification. In other words, I want to prove that I am me, in a way that is acceptable to everyone and that no one could fake it.

That's why I published my keys on the website yesterday. [The webpage](https://www.whexy.com/keys) contains two kinds of keys: PGP keys and SSH keys. Both of them are public keys in the asymmetric encryption algorithm RSA. I keep the private keys privately using encryption hardware and trusted cloud services.

I assume my readers are familiar with the concept of RSA as it was explained in an undergraduate course called Discrete Mathematics. The magic is that we are safely shielded by the lack of computing. Our RSA algorithm is secure as long as a general-purpose quantum computer has not been successfully implemented.

Since we mentioned security, it's a good time to take the opportunity to introduce who I am. I work on **System Security**. I don't know math, and I don't create new encryption algorithms. However, as many self-righteous mathematicians overlook, algorithms need to run on physical machines that actually exist.The invincible security of an algorithm does not guarantee that the system running it is secure. After all, the encryption program itself can be tampered with, the operating system can be listened to, and even the hardware can be a factor in compromising confidentiality. My peers and I do our best to ensure system-level security. We create trusted execution environments, we develop hardware encryption programs, and we verify the integrity of programs during execution.

## Degital Signing

Now let's get back to the keys.

In RSA, the algorithm for encrypting and decrypting using keys are the same. You can encrypt with a public key and decrypt with a private key, which usually happens when your friend sends you a confidential message and does not want others to find out its contents.

![](/images/keys001.png)

You can also encrypt a message with a private key and decrypt it with a public key, which is useful if you want to publish a message and prove that the message is authorized. Some tools also allow you to generate a certification instead of encryption, which is a separate used to verify the integrity of the message.

![](/images/keys002.png)

As I published my public keys on the website, my friends can do the following things:

- Encrypt a message with my key, and then send it to me (or, publish it on the Internet). I will be the only one who can decrypt it.
- Verify the certification I provided for a document (receipts, IOUs, or exemption certificates).

That sounds great and I finally finish writing the introduction to this post. In the following section, I will show you how to use my public key to encrypt files and verify certifications. I'll also provide a simple guide to anyone who might want to publish his own keys.

## Use a PGP public key

### Verification

I prepared a file `IMPORTANT_FILE.txt`, and a certification `IMPORTANT_FILE.txt.asc`. My PGP public key is published [here](https://www.whexy.com/keys), you can find the file `pgp-key.asc`.

```plain filename=IMPORTANT_FILE.txt
I love my girlfriend.
```

```plain filename=IMPORTANT_FILE.txt.asc
-----BEGIN PGP SIGNATURE-----

iQIzBAABCAAdFiEEfPx8dQcdEmI4xHQ1Bq8K57NtjcIFAmG2tS8ACgkQBq8K57Nt
jcK2AhAArqtc7EWuafB2RokzoDKEz9TuY5nN4vfpvs9nFfN96CjXD6Rz3vP6VCtD
Jgl18F9yfJgtoEG1RcPmlyGKNljP5HcafB8xeJFuvOh/rT80TZo0zyNUYz1RywQA
OUipBYap2qkrEP33ynL8zH8SEkY69ldZlraUnjpn/koD51G3rpUpDH4b7eHa+lGL
3m6EPgcosn1YjStRmMTAVq+B+9NdFVObNe/Hi28fhVUsEZo5mLfoCZk6bRMao2dW
EuFl6NLurzRtXYzf4KieWD5aMsoN6bz7rYTL5bJH9F7Tg61bz4ldcfwIt1zdv1kO
K67IJZnUtdb8A2EBW4rhAQL6pXqK9rberGBX7IhY04RDLVkJ0/2WJgwc1T9PFn/j
CWufNhNOJxMyhyml1FhsAi0vTJFgzLWvK1x1e9jNMIctXTYt/8H7gQvPFNEkGQU7
FaJW4Z5XH61GSyKlgi5k5LLeIZpmcBvZX3Y9WC/eq4hV/aO3GcLTSB53a9QDSZyQ
NbdjC4vLMMZhQXToA9c2IGoMlcoQod2Ou/N4Y6x9HamxTMhn44shyTldWbfk1t0T
o2G51ntvDriZRQoJe4PypdL1fdMJkTCIay8d2VVWNX8LOGIXQnQoqUS2ltI9WMgx
VohovVRSpPJ6hQujr72XSssAXLL/3Z1oJ3Rz1LKme8/I+lhqzoI=
=x7cw
-----END PGP SIGNATURE-----

```

To use the certification, you need to install a famous tool called GnuPG (also known as GPG), by whatever `apt install gpg` or `brew install gpg` or `choco install gnupg`. And then, with a few lines of intructions can you do this.

```shell
gpg --import pgp-key.asc
gpg --verify IMPORTANT_FILE.txt.asc IMPORTANT_FILE.txt
```

✅ The result will be "Good signature" if the file is okay.

```
❯ gpg --verify IMPORTANT_FILE.txt.asc IMPORTANT_FILE.txt
gpg: Signature made Mon Dec 13 10:51:27 2021 CST
gpg:                using RSA key 7CFC7C75071D126238C4743506AF0AE7B36D8DC2
gpg: Good signature from "WenxuanShi <whexy@outlook.com>" [ultimate]
Primary key fingerprint: 59A4 998E 07C1 D6FB 2557  51CC A513 A02F DDFF 1598
     Subkey fingerprint: 7CFC 7C75 071D 1262 38C4  7435 06AF 0AE7 B36D 8DC2
```

❌ The result will be "BAD signature" if the file is cracked.

```
❯ gpg --verify IMPORTANT_FILE.txt.asc IMPORTANT_FILE_CRACKED.txt
gpg: Signature made Mon Dec 13 10:51:27 2021 CST
gpg:                using RSA key 7CFC7C75071D126238C4743506AF0AE7B36D8DC2
gpg: BAD signature from "WenxuanShi <whexy@outlook.com>" [ultimate]
```

By the way, you should only trust the keys that is published officially. Like the one you get from my website. Chances were there that my website would been hacked. So you might want to double check web-archive if the fingerprint of my keys are replaced.

### Encryption

You still need to import my keys with `gpg --import pgp-key.asc`. After doing that, use `-se` to encrypt a file. Use `-r` to choose my keyID (which is very long). Use `-o` to decide the output path.

```shell
❯ gpg -se -o IMPORTANT_FILE.txt.encrypt -r 59A4998E07C1D6FB255751CCA513A02FDDFF1598 IMPORTANT_FILE.txt
```

Feel free to send my a encrypted file with my public key. As I said, I will be the only one who can read that.

## Publish your own keys

Publishing your keys has many other benefits than verification and encryption.

- It will make your GitHub commits outstanding with a green "Verified" status.
- It will make you look professional when you put it on your blog.
- It will make others think you're a nerd and you can finally enjoy your pathetic life with a computer without any friends in the real world.

Notice that GPG can generate different key pairs as subkeys, which you can easily revoke without affecting the primary key. You should generate a dedicated subkey for signing and another subkey for encryption. It's also recommended using different subkeys in different situations. Never use your primary key unless you want to issue a new subkey pair.

Now, if you are ready for the consequences, let's publish keys!
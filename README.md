# DCP KDM Generator 🎬🔐

A classroom **Principles of Cryptography** project that evolved into a real-world **DevOps + Crypto + Cinema** application.

This project automates **KDM (Key Delivery Message)** generation for **Digital Cinema Packages (DCP)** using a modern backend, clean frontend, and cloud deployment.

## 🌐 Live Demo
Frontend: https://kdm.antiz.xyz/

## 📌 Project Idea
Most academic projects stop at demos.  
This one didn’t.

The goal was to combine:
Cinema technology  
Cryptography standards  
Real deployment and DevOps practices  

Result: a **standards-compliant KDM generator** with a production-ready setup.

## 🎞️ What are DCP & KDM?
A **DCP** contains encrypted movie files used in cinemas.  
A **KDM** authorizes a specific projector to decrypt and play the movie for a limited time.

No KDM = No movie playback 🎥

## ⚙️ Features
* Upload DCP digest XML
* Upload projector X.509 certificate
* Generate standards-compliant KDM XML
* Secure Spring Boot REST APIs
* Clean React + Tailwind UI
* Vintage cinema-inspired design

## 🔐 Cryptography Used
* AES 128 / 256 for content encryption
* RSA 2048 / 4096 for key wrapping
* SHA-256 for message digests
* XML Digital Signature (XAdES)
* X.509 certificate validation
* Base64 encoding for XML embedding

## 🛠️ Tech Stack
* Backend: Java 17, Spring Boot
* Crypto: Bouncy Castle, JAXB
* Frontend: React, Tailwind CSS
* DevOps: Docker, Render, Vercel
* Build: Maven

## 🚀 DevOps & Deployment Learnings
This project introduced real-world challenges:
* Dockerizing Spring Boot
* Cloud deployment on Render
* Frontend hosting on Vercel
* Environment variable management
* Fixing CORS issues
* Cleaning Git LFS and repo bloat
* Debugging ports, proxies, restarts
* Securing APIs with Spring Security
* Creating reproducible production builds

## 📂 GitHub Repository
https://lnkd.in/dqiXDsuE

## 🧠 Why This Matters
This system demonstrates how cryptography protects digital cinema distribution while remaining practical, secure, and automated.

From a **minor classroom assignment** to a **full cloud-deployed application**, this project became a hands-on DevOps and security learning journey.

Technology 🤝 Cinema  
Even debugging felt cinematic 🎬✨

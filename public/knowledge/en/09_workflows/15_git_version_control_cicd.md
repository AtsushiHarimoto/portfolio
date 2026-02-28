# 15. Git Version Control and CI/CD Automation Pipeline Guide

> **Type**: Basic Engineering Knowledge & Best Practices  
> **Date**: 2026-02-25

In modern software engineering collaboration, relying solely on AI Agents to make code changes is insufficient. To ensure system stability and track historical changes, **Git** and **CI/CD** have become an indispensable core infrastructure. This guide will walk you through the operational models of these two major technological mechanisms.

---

## 1. Git: The Version Control System with Traceability

Without version control, file naming often devolves into a confusing, untraceable mess like `final_version.docx`, `absolute_final_version.docx`, etc. In software development, such management methods would bring disastrous consequences, and **Git** is the version control system born to solve this exact pain point.

### Core Mechanisms of Git

1. **Commit**:
   Every time a developer or an Agent makes changes to the codebase and executes a "Commit" operation, Git records a complete snapshot of the code at that moment. This way, even if irreversible, destructive edits occur, the system retains the ability to revert to any historical state.
2. **Branch**:
   - **Main Branch (`main`)**: Generally represents the current formal production environment or the most stable code version.
   - **Feature Branch**: When there is a need to develop a new feature (e.g., `feature/new-ui`) or fix a bug, it should be done in an isolated branch. This creates an independent development environment, ensuring that experimental changes do not affect the stability of the main line.
   - Once the development on the branch has been fully tested and confirmed to be error-free, the changes are integrated back into the `main` branch via a Merge operation.

3. **Merge Conflict**:
   When different branches happen to make distinct changes to the exact same lines of code in the same file, Git will be unable to automatically determine which one to keep during the merge. This is a merge conflict. At this point, human intervention is required to resolve it, confirming the logic and manually keeping the correct segments of changes.

---

## 2. CI/CD: Automated Software Testing, Packaging, and Deployment Pipelines

After the code is written, committed, and pushed to a version control center (like GitHub or GitLab), modern development workflows abandon the practice of manually uploading files to the production server. Instead, they rely on **CI/CD (Continuous Integration / Continuous Deployment)** systems to build a stable and fully automated software delivery pipeline.

### CI (Continuous Integration)

- **Core Objective**: To intercept and block flawed code before it merges into the main line or enters the production environment.
- **Standard Operational Flow**:
  1. When an Agent commits and pushes new code to the cloud repository, it automatically triggers the CI server (e.g., GitHub Actions bots).
  2. The system will automatically provision a clean, isolated, temporary execution environment.
  3. The system will automatically run pre-written suites of testing scripts (unit tests, integration tests, etc.). If an error occurs or the standards are not met, that commit will be marked as failed ❌, and its permission to merge into the `main` line will be forcibly blocked.

### CD (Continuous Deployment)

- **Core Objective**: To achieve smooth, painless, and highly automated version releases.
- **Standard Operational Flow**:
  1. Once the CI checks are confirmed to be fully passed ✅, and the branch is officially approved to merge into `main`, the CD phase officially begins.
  2. The system will automatically execute the Build process, packaging the source code into an executable application bundle.
  3. The system automatically authorizes login to the production server or cloud container environment, replaces the old code, and performs a graceful restart. This entire process requires zero human intervention.

### Zero Downtime Deployment Strategies

In a formal production environment where tens of thousands of users are connected simultaneously, directly "overwriting old files and rebooting" will trigger disconnection errors. To address this, the industry has developed incredibly elegant release strategies:

- **Blue-Green Deployment**:
  - **Method**: Maintain two identical host systems simultaneously (for example, the primary is Blue, the backup is Green). During normal operations, the users' Load Balancer directs 100% of traffic to "Blue". When a new version is released, CI/CD will first secretly deploy it to the completely isolated "Green" environment, allowing QA engineers to poke around and test it.
  - **Switching and Rollback**: Once confirmed error-free, the Load Balancer's pointer snaps, instantly redirecting 100% of user traffic from Blue to "Green". If the new version triggers massive errors, the switch can revert back to the old "Blue" version in one second, **achieving the fastest Rollback in history**. The downside is expensive hardware costs (you must maintain two isolated silo clusters).
- **Canary Release**:
  - **Method**: The term originates from early miners taking canaries down into mineshafts to test for poisonous gases. When releasing a new version, _never_ completely replace the old version! Instead, use a Gateway or Service Mesh to intercept traffic, and only **"randomly sample 5% of packets from millions of users and direct them to the new version (Canary) Pod for service,"** while the remaining 95% is still handled by the stable old version.
  - **Observation and Full Rollout**: During this 5% user trial period, we closely monitor the App error rates and server crash metrics on the Grafana dashboard. Once we confirm these canaries are surviving and thriving, we gradually open the valve to 10%, 50%, and finally achieve 100% full coverage of the new version. Compared to the Blue-Green strategy, this can precisely contain the blast radius of an online disaster to the minimum.

---

## 💡 Vibecoding Instructions

In the Moyin project, we heavily rely on cloud CI/CD services like GitHub Actions. Therefore, even if an AI Agent reports "Task completed," **the inspection result from the cloud CI system is the ultimate objective standard for approving a merge.** If code that causes service crashes is submitted, the pipeline will strictly block it.

When you need an AI to help build or adjust this type of automated pipeline, it is recommended to use the following precise instructional format:

> `[CI/CD Configuration Request] Please help write a YAML pipeline script suitable for GitHub Actions. Specification requirements: Whenever a push event occurs to the main branch, it must prioritize executing 'npm run test' (CI check). Only after confirming all its results have passed can it proceed to the subsequent automated deployment (CD) script phase.`

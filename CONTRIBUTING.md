# Branching Strategy

- **main**  
  - Always production‐ready.  
  - Merges only via Pull Request (PR), with 1 approval and passing CI.

- **feature/***  
  - Create off `main`:  
    ```bash
    git checkout main
    git pull
    git checkout -b feature/your-brief-name
    ```
  - Push your branch and open a PR against `main`.
  - After merge, delete the branch.

- **hotfix/***  
  - Same as features, for urgent fixes.
  
## PR Guidelines

1. Target branch: `main`  
2. Include a short description and link any issue.  
3. Wait for 1 review + CI to pass before merging.

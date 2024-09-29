# For JR students

## Get started

1. Setup your own environment

   - Typescript
   - React
   - node & npm

2. Build and run your project

   - Build & run

   ```
   cd Frontend
   make build
   make start
   ```

   - Once it run, open `http://localhost:5173/` in your browser.

3. Fun stuff starts!

## Debug

### Understand CRM_ENV and API URL

Read [this](../Docs/Environment.md)

You can use `CRM_API_URL` environment variable to redirect API call to different backend environment.

## Connect to DEV env backend (Base backend)
Need to run the following command to set environment variables in local.

```
export CRM_API_URL=https://api-crm-dev.cyberlark.com.au
```

## Connect to JR backend (JR backend)
Properties, files etc related backend changes will be deployed in this backend. (not the Base backend above)
So if you need to use JR backend, run the following command:
 ```
export CRM_JR_API_URL=https://3oib51otce.execute-api.ap-southeast-2.amazonaws.com/prod
```

## Connect to your own backend (local backend)
If you also working on backend, you need to clone Backend repo and change CRM_ENV variable to your own name, which has to match the name under `./configs/*.json`. Ask David if you are not sure about this step. then you can run make deploy to get your own api gateway endpoint and you can set it. (It will be something similar to this command as below)
 ```
export CRM_JR_API_URL=https://this-is-your-own-backend-endpoint.execute-api.ap-southeast-2.amazonaws.com/prod
```


## Set Google Map API Key

Get your api key from https://developers.google.com/maps/documentation/javascript/get-api-key

```
export VITE_APP_GMAP_API_KEY=your_api_key
```

## Learning Skills

- React
- Typescript
- Redux

## PR rules

0. You don't need to FORK my project, just do your work under this repository.

1. All work need to start in a branch. Under each 'Issue', there is a `Create branch` link to create the branch. Checkout the branch, and add your fix.

2. Commit your changes uner your branch

3. Push your branch

4. Create Pull Request. If you don't want other people to review it, Add `DRAFT` in PR title. Once you are happy your changes. Remove DRAFT, and move on.

5. In PR, please summary what you have fixed, or why you change it in a few sentence. Point to the problem in changes might help reviewers to approve. Also good code comment will also help. For Frontend fix, please attach a screenshot to the review.

6. Ask team member to review. Add at least 2 team remembers in the PR. Change your code, until all members are happy.

7. Assign the PR to me `CyberlarkCode`. I will do a final check, and merge the `main`. This might takes some time to finish.

8. During PR, if the comment has been fix. You can mark this comment as `Resolved`.

9. Once the PR is merged to `main`. Move on, and pick up the next issue.

## Q&A

1. ...

If you have any other questions, please ask me.
If this doc is confusing or not clear, please polish the doc after you have known the answer.

Thanks!

## Husky and pre-commit hooks

Setting Up and Using Husky with lint-staged for Pre-Commit Hooks

1. Installation: If you've just cloned the repository or made changes to the package.json file, make sure to run:

```
npm install
```

This ensures Husky and lint-staged are installed in your local node_modules.

2. Husky Configuration: Husky configurations can be found under the .husky/ directory. Ensure that all files in this directory have the appropriate permissions to be executable.

3. Committing with Husky: With Husky set up, every new commit will be subject to eslint rules. Avoid making any direct changes to .eslintrc.json and .prettierrc. If a modification is essential, discuss it with the team before proceeding.

4. Workflow:

Stage your changes using:

```
git add .
```

Commit your changes:

```
git commit -m "Your commit messages"
```

During this commit process, Husky's pre-commit hook will trigger, examining your code based on eslint rules. If possible, the hook will also try to automatically rectify any issues using eslint --fix. If the auto-fix fails, you'll need to manually address the issues.

Once your code passes the checks, you can push it to your branch:

```
git push
```

5. For Non-Frontend Changes: If you're working outside the Frontend directory, it's recommended to use the Source Control feature in VSCode for adding, committing, and pushing changes.

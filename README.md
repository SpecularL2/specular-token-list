# Specular Token List

The Specular token list is a community list of tokens deployed on Specular managed by the maintainers of this repo.

It serves as a source of truth for services such as the [Specular Bridge UI](https://bridge.specular.network/) and [DEX](https://swap.specular.network/#/swap)

Anyone can deploy/bridge a token permissionlessly, by adding the token to this list it gets officialy accepted and used in Specular's services.

Please note that by adding a token to the list we aren’t making any claims about the token itself; tokens are not reviewed for their quality, merits, or soundness as investments.

## Review process and merge criteria

### Process overview

1. Follow the instructions below to create a PR that would [add your token to the list](#adding-a-token-to-the-list).
2. Wait for a reviewer to kick off the [automated checks](#automated-checks).
3. After the automated checks pass and a reviewer approves the PR, then it will automatically be merged.

### Automated checks

Our CI performs a series of automated checks on every PR.
These automated checks take place as part of the `Validate PR` check.
Some issues raised by CI will trigger an error and must be resolved before your PR will be approved.
These issues are marked below as "auto-reject" issues.
Other issues will surface a warning, and will require a manual review from a reviewer.
These issues are marked below as "requires manual review".

- Given tokens actually exist on all specified chains (auto-reject)
- Description is under 1000 characters (auto-reject)
- Token `name`, `symbol`, and `decimals` matches on-chain data (auto-reject)
  - If `overrides` are used (requires manual review)
- Ethereum token listed on the [CoinGecko Token List](https://tokenlists.org/token-list?url=https://tokens.coingecko.com/uniswap/all.json)(requires manual review)
  - _Why CoinGecko? CoinGecko's token list updates every hour which means we get token list updates very quickly. CoinGecko also uses an in-depth [listing criteria](https://www.coingecko.com/en/methodology)._

#### Debugging Automated checks failures

If your automated checks failed, you can see the reason for the failure by downloading `validation-artifacts.zip`, unzipping it and opening the `validation_results.txt` file. To locate the `validation-artifacts` follow these steps:

1. Click on the `Details` link for `Validate PR` check in your PR
2. Click `Summary` in the left panel
3. Find the section on the page labeled `Artifacts` and click on `validation-artifacts`
4. After download of `validation-artifacts.zip`, unzip it and open `validation_results.txt`

If you make changes and need to run the validation check again, you will need to wait for a reviewer to approve the checks to run again. However, if you do not want to wait for a reviewer to approve the checks to run again to see if the failures have been resolved, you can run the validation checks locally by running:

```
npx tsx ./bin/cli.ts validate --datadir ./data --tokens <data folder name (e.g. ETH)>
```

### Final approval

All PRs are subject to a light-weight final approval, even if not marked as `requires manual review`.

## Adding a token to the list

### Create a folder for your token

Create a folder inside of the data folder with the same name as the symbol of the token you are trying to add. For example, if you are adding a token with the symbol "ETH" you must create a folder called ETH.

### Add a logo to your folder

Add a logo to the data folder you just created. Your logo MUST be an SVG called `logo.svg`. Your logo should be at least 200x200 pt minimum and 256x256 pt preferred.

### Create a data file

Add a file to your folder called `data.json` with the following format:

```json
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "Token description",
  "tokens": {
    "specular": {
      "address": "0x0000000000000000000000000000000000000000"
    }
  }
}
```

#### Non-bridgable tokens

If you would like to add your token to this token list but you do not want your token to be included on the Specular apps, please include the `nobridge` option.

```json
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "A multi-chain token",
  "website": "https://token.com",
  "twitter": "@token",
  "nobridge": true,
  "tokens": {
    ...
  }
}
```

#### Non-standard tokens

If your token is not a standard ERC20 (e.g., DSToken), please include the `nonstandard` option.

```json
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "A multi-chain token",
  "website": "https://token.com",
  "twitter": "@token",
  "nonstandard": true,
  "tokens": {
    ...
  }
}
```

#### Per-token overrides

If you require overrides for specific tokens, you can include the `overrides` field. You are able to override the `name`, `symbol`, `decimals`, or `bridge` for any token. You do not need to override every token at the same time.

```json
{
  "name": "Token Name",
  "symbol": "SYMBOL",
  "decimals": 18,
  "description": "A multi-chain token",
  "website": "https://token.com",
  "twitter": "@token",
  "tokens": {
    "specular": {
      "address": "0x1234123412341234123412341234123412341234",
      "overrides": {
        "name": "My Ethereum Token"
      }
    }
  }
}
```

### Create a pull request

Open a pull request with the changes that you've made. Please only add one token per pull request to simplify the review process. This means two new files inside of one new folder. If you want to add multiple tokens, please open different PRs for each token.

### Respond to validation checks

Your pull request will be validated by a series of automated checks. If one of these checks fails, please resolve these issues and make sure that validation succeeds. We will review your pull request for final approval once automated validation succeeds.

### Wait for the token list to update automatically

Once your PR is merged, the token list will update automatically to include your token. Please do NOT update the token list (`specular.tokenlist.json`) directly. All token list updates will be handled automatically when PRs are merged into the `master` branch.

### Credits

This token-list utilizes code and resources from the following repositories: [Github](https://github.com/ethereum-optimism/ethereum-optimism.github.io/)

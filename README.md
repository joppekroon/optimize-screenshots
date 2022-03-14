# Optimize Screenshots

Takes a PNG screenshot, or a directory of them, and optimizes them plus a range of WebP versions.

## Usage

Clone the repository

Install the dependencies
```
  npm install
```

And you can run the script from the root of the repository.
```
  node ./optimize.js <source> <dest> --widths <pixels...>
```

## Install to path

You can also install the script to your path, and use it everywhere.

From the root of the repository:
```
  npm install --global .
```

And then you can just run `optimize`
```
  optimize 'test screenshot.png' 'public\assets' --widths 1200 800
```

## PowerShell

When running from PowerShell, it may complain that:
```
  running scripts is disabled on this system.
```

This can be easily changed by reducing the strictness of the ExecutionPolicy, e.g.
```
  Set-ExecutionPolicy RemoteSigned
```
This will permanently change the ExecutionPolicy for everything. There are many more options described in the [official Set-ExecutionPolicy documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.2) if you are uncomfortable with this.

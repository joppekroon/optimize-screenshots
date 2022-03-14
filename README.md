# Optimize Screenshots

Takes a PNG screenshot, and produces a optimized version plus a range of WebP versions.
Can also search a directory for PNG screenshots, and apply the tranformation to each.

# Usage

Clone the repository


Install the dependencies
```
  npm install
```

And you can run the script from the root of the repository.
```
  node ./optimize.js file <file> <dest> --widths <pixels...>
  node ./optimize.js dir <dir> <dest> --widths <pixels...>
```

# Install to path

You can also install the script to your path, and use it everywhere.

From the root of the repository:
```
  npm install -g .
```

And then you can just run `optimize`
```
  optimize file --widths 1200 800 'test screenshot.png' 'public\assets'
```

When running from PowerShell, it may complain that:
```
  running scripts is disabled on this system.
```

This can be easily changed by reducing the strictness of the ExecutionPolicy, e.g.
```
  Set-ExecutionPolicy RemoteSigned
```
This will permanently change the ExecutionPolicy for everything. There are many more options described in the [official Set-ExecutionPolicy documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.2) if you are uncomfortable with this.

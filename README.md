# generator-nemo

Generator for adding Nemo functional tests to a [Kraken 1.0](https://github.com/krakenjs/kraken-js) application

## Pre requisites

1. You need to have a kraken 1.0 based application
2. If you plan to see tests run on your machine, you need to decide on and set up the appropriate webdriver
  * Please see https://github.com/paypal/nemo-docs/blob/master/driver-setup.md
3. You need to have Yeoman installed:
```
$ npm install -g yo
```
## To install generator-nemo from npm, run:

```
$ npm install -g generator-nemo
```

## Use the generator:

from within your application's base directory:
```
$ yo nemo
```

Follow prompts. Take special care during the browser/driver setup questions (again please read about [driver setup](https://github.com/paypal/nemo-docs/blob/master/driver-setup.md) )

Once complete, you should be able to see your first suite run using the command `grunt automation`

## License

MIT

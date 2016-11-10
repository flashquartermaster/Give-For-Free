var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var bower = require('bower');
var sh = require('shelljs');
var Server = require('karma').Server;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var execFile = require('child_process').execFile;
var shell = require('gulp-shell');
var glupExec = require('gulp-exec');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('Default', ['sass']);

gulp.task('Sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('Watch sass', function() {
  gulp.watch(paths.sass, ['sass']);
});


gulp.task('Run Unit Tests', function (done) {
  new Server({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('Watch Unit Tests', function (done) {
  new Server({
    configFile: __dirname + '/tests/karma.conf.js',
    autoWatch: true
  }, done).start();
});


gulp.task('Test run appium', function( callback ) {

  shell.task('appium', {quiet: true})();
  //spawn('appium', [], { stdio: 'inherit' })();
  // allow appium to start, should not take more than 4181ms
  setTimeout(function () {
    return shell.task('node_modules/.bin/protractor tests/android-conf.js')();
  }, 10000);

  /*exec('node  node_modules/.bin/appium', function(err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  });*/

  /*execFile('node_modules/.bin/appium', function(err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
  });*/

 /* var workerProcess = spawn('node_modules/.bin/appium', [], { stdio: 'inherit' });

  workerProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
    // exec('node_modules/.bin/protractor tests/ios-conf.js', function (err, stdout, stderr) {
    //   console.log(stdout);
    //   console.log(stderr);
    // })
  });*/

  //shell.task('appium',{verbose:true, errorMessage:true})();

 /* var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false//, // default = false, true means stdout is written to file.contents
    //customTemplatingThing: "test" // content passed to gutil.template()
  };
  var reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
  }

  gulp.run( glupExec('appium', options) ).pipe(glupExec.reporter(reportOptions)).on('end', callback);*/


});

/*var gulp = require("gulp"),
    cordova = require("cordova-lib").cordova;

gulp.task("default", function (callback) {
  cordova.build({
    "platforms": ["android"],
    "options": ["--release","--gradleArg=--no-daemon"]
  }, callback);
});*/



gulp.task('Run android e2e tests', function() {
  //ionic build android > run appium > run protractor android-conf.js

  exec('ionic build android', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    exec('node node_modules/.bin/appium', function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);

      exec('node_modules/.bin/protractor tests/android-conf.js', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });

    });

  });
});

gulp.task('Run iOS e2e tests', function() {
  //cordova prepare ios > cordova build ios > run appium > run protactor ios-conf.js

  exec('ionic prepare ios', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);

    exec('ionic build ios', function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);

      // exec('node node_modules/.bin/appium', function (err, stdout, stderr) {
      //   console.log(stdout);
      //   console.log(stderr);

        exec('node_modules/.bin/protractor tests/ios-conf.js', function (err, stdout, stderr) {
          console.log(stdout);
          console.log(stderr);
        });

      // });

    });

  });

});


gulp.task('Install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


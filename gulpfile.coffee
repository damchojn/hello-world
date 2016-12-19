gulp = require 'gulp'
concat = require 'gulp-concat'

gulp.task 'clean', ->
    require('del') ['dist', 'bin']

gulp.task 'copy:scripts', ->
    gulp.src 'src/scripts/*.js'
        .pipe gulp.dest 'dist/scripts'

gulp.task 'build:content:js', ->
    gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
            'node_modules/toastr/build/toastr.min.js'
            'src/scripts/content/*.js'
        ])
        .pipe concat 'content.js'
        .pipe gulp.dest 'dist/scripts'


gulp.task 'build:content:css', ->
    gulp.src([
            'node_modules/toastr/build/toastr.min.css'
            'src/scripts/content/*.css'
        ])
        .pipe concat 'content.css'
        .pipe gulp.dest 'dist/styles'

gulp.task 'build:background', ->
    gulp.src([
            'node_modules/jquery/dist/jquery.min.js'
            'src/scripts/background/clipboard.js'
            'src/scripts/background/background.js'
        ])
        .pipe concat 'background.js'
        .pipe gulp.dest 'dist/scripts'

gulp.task 'copy:manifest', ->
    gulp.src 'src/manifest.json'
        .pipe gulp.dest 'dist'

gulp.task 'copy:images', ->
    gulp.src 'src/images/*.*'
        .pipe gulp.dest 'dist/images'

gulp.task 'build', [
    'build:content:js'
    'build:content:css'
    'build:background'
    'copy:scripts'
    'copy:manifest'
    'copy:images'
]

gulp.task 'watch', ->
    gulp.watch 'src/scripts/background/*.js', ['build:background']
    gulp.watch 'src/scripts/content/*.js',    ['build:content:js']
    gulp.watch 'src/scripts/content/*.css',   ['build:content:css']
    gulp.watch 'src/scripts/*.js',            ['copy:scripts']
    gulp.watch 'src/manifest.json',           ['copy:manifest']

gulp.task 'pack', ['build'], () ->
    {'7z' : _7z} = require('7zip')
    {spawn} = require('child_process')
    spawn(_7z, ['a', 'bin\\extension.zip', '.\\dist\\*'])
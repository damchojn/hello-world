gulp = require 'gulp'


gulp.task 'clean', ->
    require('del') ['dist', 'bin']

gulp.task 'copy:scripts', ->
    gulp.src 'src/scripts/*.js'
        .pipe gulp.dest 'dist/scripts'

gulp.task 'copy:manifest', ->
    gulp.src 'src/manifest.json'
        .pipe gulp.dest 'dist'

gulp.task 'copy:images', ->
    gulp.src 'src/images/*.*'
        .pipe gulp.dest 'dist/images'

gulp.task 'build', [
    'copy:scripts'
    'copy:manifest'
    'copy:images'
]

gulp.task 'watch', ->
    gulp.watch 'src/scripts/*.js',  ['copy:scripts']
    gulp.watch 'src/manifest.json', ['copy:manifest']

gulp.task 'pack', ['build'], () ->
    {'7z' : _7z} = require('7zip')
    {spawn} = require('child_process')
    spawn(_7z, ['a', 'bin\\extension.zip', '.\\dist\\*'])
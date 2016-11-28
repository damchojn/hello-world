gulp = require 'gulp'


gulp.task 'clean', ->
    require('del') ['dist', 'bin']

gulp.task 'build', ['clean'], ->
    gulp.src 'src/**/*'
        .pipe gulp.dest 'dist'

gulp.task 'pack', ['build'], () ->
    {'7z' : _7z} = require('7zip')
    {spawn} = require('child_process')
    spawn(_7z, ['a', 'bin\\extension.zip', '.\\dist\\*'])

gulp.task 'watch', ->
    gulp.watch 'src/**/*', ['build']
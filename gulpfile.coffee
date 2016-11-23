gulp = require 'gulp'


gulp.task 'clean', ->
    require('del') ['dist', 'bin']

gulp.task 'build', ->
    gulp.src 'src/**/*'
        .pipe gulp.dest 'dist'

gulp.task 'pack', () ->
    {'7z' : _7z} = require('7zip')
    {spawn} = require('child_process')
    spawn(_7z, ['a', 'bin\\extension.zip', '.\\dist\\*'])

gulp.task 'watch', ->
    gulp.watch 'src/**/*', ['build']


gulp.task 'default', [
    'clean'
    'build'
    'pack'
]
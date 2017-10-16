var gulp = require('gulp'),
		sass = require('gulp-sass'), //Подключаем Sass пакет
		browserSync = require('browser-sync'), // Подключаем Browser Sync
		concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
		uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		del = require('del'),
		// imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    // pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
		cache = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src(['app/sass/**/*.sass', 'app/sass/**/*.scss']) // Берем источник
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browser Sync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});


// gulp.task('css-libs', ['sass'], function() {
//   return gulp.src('app/css/libs.css') // Выбираем файл для минификации
//     .pipe(cssnano()) // Сжимаем
//     .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//     .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
// });



gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/masonry/dist/masonry.pkgd.min.js'
		])
		.pipe(concat('libs.js')) // Собираем их в кучу в новом файле libs.min.js
		// .pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('watch', ['browser-sync', 'scripts'], function() {
    gulp.watch(['app/sass/**/*.sass', 'app/sass/**/*.scss'], ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/css/**/*.css', browserSync.reload);
    // Наблюдение за другими типами файлов
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// gulp.task('img', function() {
//   return gulp.src('app/img/**/*') // Берем все изображения из app
//     .pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
//       interlaced: true,
//       progressive: true,
//       svgoPlugins: [{removeViewBox: false}],
//       use: [pngquant()]
//     })))
//     .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
// });


gulp.task('build', ['clean', 'sass', 'scripts'], function () {

	var buildCss = gulp.src([
		'app/css/main.min.css',
		'app/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildImg = gulp.src('app/img/**/*')
		.pipe(gulp.dest('dist/img'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);
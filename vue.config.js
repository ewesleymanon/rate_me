const path = require('path')
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')
imagemin(['src/assets/images/auth/*.{jpg,png}'], 'public/img/images/minified/minified/auth', {
  use: [
    imageminWebp({ quality: 100 })
  ]
}).then(() => {
  console.log('Images optimized')
})
imagemin(['src/assets/images/gallery/*.{jpg,png}'], 'public/assets/images/minified/gallery', {
  use: [
    imageminWebp({ quality: 100 })
  ]
}).then(() => {
  console.log('Wesley')
})
imagemin(['src/assets/images/hero/*.{jpg,png}'], 'public/assets/images/minified/hero', {
  use: [
    imageminWebp({ quality: 100 })
  ]
}).then(() => {
  console.log('Wesley')
})
imagemin(['src/assets/images/icons/*.{jpg,png}'], 'public/assets””/images/minified/icons', {
  use: [
    imageminWebp({ quality: 100 })
  ]
}).then(() => {
  console.log('Wesley')
})
imagemin(['src/assets/images/logo/*.{jpg,png}'], 'public/assets/images/minified/logo', {
  use: [
    imageminWebp({ quality: 100 })
  ]
}).then(() => {
  console.log('Wesley')
})
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '~': path.join(__dirname, '/src')
      }
    }
  }
}

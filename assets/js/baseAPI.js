// 每次调用.get和.post和.ajax请求前都会先调用这个函数
// 在这个函数中我们可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
})
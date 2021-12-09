$(function () {
    let q = {
        pagenum: 1,//页码值默认为1
        pagesize: 2,//默认显示2条数据
        cate_id: '',  //文章分类的id
        state: ''   //文章的发布状态   
    }
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage;
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        let y = zeroP(dt.getFullYear())
        let m = zeroP(dt.getMonth() + 1)
        let d = zeroP(dt.getDate())
        let H = zeroP(dt.getHours())
        let mm = zeroP(dt.getMinutes())
        let ss = zeroP(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + H + ':' + mm + ':' + ss
    }
    // 定义补零函数
    function zeroP(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取文章列表信息数据
    initTable()
    initArtList()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成功！')
                let htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
                // 调用渲染分页方法
                randerPage(res.total)
            }
        })
    }
    // 获取文章分类列表
    function initArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                layer.msg('获取文章分类列表成！')
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 为筛选表单绑定提交事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate
        q.state = state
        initTable()
    })
    // 定义渲染分页的方法
    function randerPage(total) {
        // 调用laypage渲染分页
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        let len = $('.btn-delete').length
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()

                }
            })
            layer.close(index);
        });
    })
})
const db = require("../models");
const ru = require("./locale/ru.js");
const themes = require("./theme/theme.js");
const sidebar = require("./resources/navigation");
const category = require("./resources/options/category.option")
const sub_category = require("./resources/options/sub_category.option")
const master_gallery = require("./resources/options/master_gallery.option")
const master_jobs = require("./resources/options/master_jobs.option")
const master = require("./resources/options/master.option")
const discounts = require("./resources/options/discounts.option")
const { Components, componentLoader } = require('./components/components.js')

const dashboardHandler = async (request, response, context) => {
    var datas = db.orders.findAll()
    return datas
}
module.exports = {
 resources: [
    category,
    sub_category,
    discounts,
    // {
    //     resource: db.category,
    //     options: {
    //         navigation: sidebar[0],
    //         properties: {
    //             createdAt: { isVisible: { list: false } },
    //             updatedAt: { isVisible: { list: false } },
    //         },
    //     },
    // },
    {
        resource: db.client_favourites,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.client_history,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.client,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.faq,
        options: {
            navigation: sidebar[4],
            properties: {
                answer: {
                    type: 'richtext'
                },
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.master_comments,
        options: {
            navigation: sidebar[2],
            properties: {
                comment: {
                    type: 'richtext'
                },
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    master_jobs,
    master_gallery,
    {
        resource: db.master_services,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.master_socials,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    master,
    {
        resource: db.order_list,
        options: {
            navigation: sidebar[3],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.order,
        options: {
            navigation: sidebar[3],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.service,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.static_info,
        options: {
            navigation: sidebar[4],
            properties: {
                description: {
                    type: 'richtext'
                },
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
 ],
 rootPath: '/admin',
 locale: {
  language: 'ru',
  translations: ru
 },
 branding: {
    logo: '/logo.png',
    favicon: '/favicon.png',
    companyName: 'Sulu Face',
    withMadeWithLove: false,
    theme: themes
 },
 assets: {
    styles: ["/custom.css"]
 },
 dashboard: {
    component: Components.Dashboard,
    handler: dashboardHandler
 },
 componentLoader,
}
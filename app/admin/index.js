const db = require("../models");
const ru = require("./locale/ru.js");
const themes = require("./theme/theme.js");
const sidebar = require("./resources/navigation");
const { Components, componentLoader } = require('./components/components.js')

const dashboardHandler = async (request, response, context) => {
    var datas = db.orders.findAll()
    return datas
}
module.exports = {
 resources: [
    {
        resource: db.clients,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.moving,
        options: {
            navigation: sidebar[1],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.drivers,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.cities,
        options: {
            navigation: sidebar[0],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.orders,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.order_status,
        options: {
            navigation: sidebar[2],
            properties: {
                createdAt: { isVisible: { list: false } },
                updatedAt: { isVisible: { list: false } },
            },
        },
    },
    {
        resource: db.order_history,
        options: {
            navigation: sidebar[2],
            properties: {
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
    companyName: 'Keremet Logistics',
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
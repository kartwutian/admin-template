/* eslint-disable */

const router = [
  {
    "route": "/project",
    "routes": [],
    "path": "pages/Home/index",
    "name": "首页",
    "hasBread": true,
    "subTitle": "子标题"
  },
  {
    "route": "/login",
    "routes": [],
    "path": "pages/Login/index",
    "name": "登录",
    "isInLayout": false
  },
  {
    "route": "/form",
    "routes": [
      {
        "route": "/form/basic",
        "routes": [],
        "path": "pages/Form/Basic",
        "template": "list",
        "name": "basic",
        "authority": [
          "user"
        ]
      },
      {
        "route": "/form/step",
        "routes": [],
        "path": "pages/Form/Step",
        "template": "list",
        "name": "step",
        "authority": "admin"
      }
    ],
    "name": "表单页"
  },
  {
    "route": "/maps",
    "routes": [],
    "path": "pages/Maps/index",
    "name": "地图",
    "isHideInMenus": true
  }
]

export default router;

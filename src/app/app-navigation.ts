export const navigation = [
  {
    text: "机构与权限",
    //path: '/admin/rbac',
    icon: "home",
    items: [
      { text: "公司管理", path: "/admin/rbac/company" },
      { text: "菜单管理", path: "/admin/rbac/menu" },
      { text: "角色管理", path: "/admin/rbac/role" },
      { text: "用户管理", path: "/admin/rbac/user" }
    ]
  },
  {
    text: "代办",
    icon: "home",
    items: [
      { text: "项目经理申请", path: "/admin/task/verify-project-manage-apply" },
      { text: "分类", path: "/admin/blog/post-cate" },
      { text: "标签", path: "/admin/blog/post-tag" }
    ]
  }




];

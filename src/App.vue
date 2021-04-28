<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

</script>
<style >
.filter >>> .el-form-item__label{
  width: auto!important;
}
.el-table--scrollable-x .el-table__body-wrapper {
  z-index : 1;
}
.el-table .el-table__fixed {

      height: auto !important;
      bottom: 18px;
}
.el-table    .el-table__fixed-right {
      height: auto !important;
      bottom: 18px;
    }

/** 移动端适配 */

html {
  font-size: 14px;
}
body{
       font-size:14px;
   }
p{
       font-size:14px;
}
div {
  font-size: 14px;
}
@media screen and (max-width:1366px) {
  html {
    font-size:  14px;
  }
  body{
       font-size:14px;
   }
   p{
       font-size:14px;
   }
}

@media screen and (max-width:1920px) {
  html {
    font-size:  14x;
  }
  body{
       font-size:14px;
   }
   p{
       font-size:14px;
   }
}

@media screen and (max-width: 480px) {
  .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner,.el-checkbox__input.is-disabled+.el-checkbox__label{
   opacity: 1;
   -webkit-text-fill-color: #606266;
  }
  /* label {
    min-width: 60px;
  } */
  .el-dialog__wrapper .el-dialog {
    width: 95% !important;
  }
  .el-dialog__wrapper .el-dialog .el-dialog__body {
    overflow: auto
  }
  .el-drawer__wrapper .el-drawer {
    width: 95% !important;
  }
  .el-drawer__wrapper .el-drawer .el-drawer__body {
    overflow: auto
  }
  .el-message { min-width: 300px !important; }

}

  body .el-table th.gutter {
   display: table-cell !important;
  }

  body .el-table colgroup.gutter {
   display: table-cell !important;
  }

  .el-table--border th.gutter:last-of-type {
   display: block !important;
  }

</style>

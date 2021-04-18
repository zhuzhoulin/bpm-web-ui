export const baseList = [
  {
    type: 'input', // 控件类型
    icon: 'el-icon-edit', // 图标
    label: '输入框', // 控件名字
    options: {
      label: '输入框',
      minWidth: 10,
      width: 100, // 宽度
      defaultValue: '', // 默认值
      placeholder: '请输入', // 没有输入时，提示文字
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持

    },
    model: '', // 数据字段
    key: '',
    rules: [
      // 验证规则
      {
        required: false, // 必须填写
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'text', // 控件类型
    icon: 'el-icon-edit-outline', // 图标
    label: '文本域', // 控件名字
    options: {
      minWidth: 10,
      width: 100, // 宽度
      height: 3, // 高度
      defaultValue: '', // 默认值
      placeholder: '请输入', // 没有输入时，提示文字
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项

    },
    model: '', // 数据字段
    key: '',
    rules: [
      // 验证规则
      {
        required: false, // 必须填写
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'number', // 控件类型
    icon: 'el-icon-c-scale-to-original', // 图标
    label: '数值输入框', // 控件名字
    options: {
      minWidth: 40,
      width: 100, // 宽度
      numberDefaultValue: 0, // 默认值
      min: -999999999, // 可输入最小值
      max: 99999999999,
      step: 1,
      precision: null,
      disabled: false, // 是否禁用，false不禁用，true禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '', // 数据字段
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'rate', // 表单类型
    label: '评分', // 标题文字
    icon: 'el-icon-umbrella',
    options: {
      defaultValue: 0,
      max: 5, // 最大值
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      allowHalf: false, // 是否允许半选
      width: 100, // 宽度
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'select', // 控件类型
    icon: 'el-icon-caret-bottom', // 图标
    label: '下拉选择框', // 控件名字
    options: {
      width: 100, // 宽度
      minWidth: 20,
      multiple: false,
      defaultValue: '1', // 下拉选框请使用null为默认值
      multipleDefaultValue: [],
      disabled: false, // 是否禁用
      clearable: false, // 是否显示清除按钮
      hidden: false, // 是否隐藏，false显示，true隐藏
      placeholder: '请选择', // 默认提示文字
      dynamicKey: '',
      dynamic: false,
      options: [
        // 下拉选择项配置
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        }
      ],
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'cascader', // 表单类型
    label: '级联选择器', // 标题文字
    icon: 'el-icon-office-building',
    options: {
      width: 100,
      multipleDefaultValue: [],
      multiple: false,
      disabled: false, // 是否禁用
      defaultValue: '1', // 默认值
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      placeholder: '请选择',
      clearable: false, // 是否显示清除按钮
      hidden: false, // 是否隐藏，false显示，true隐藏
      showAllLeavels: false, // 定义了是否显示完整的路径，将其赋值为false则仅显示最后一级
      dynamicKey: '',
      dynamic: true,
      options: [
        {
          value: '1',
          label: '选项1',
          children: [
            {
              value: '11',
              label: '选项11'
            }
          ]
        },
        {
          value: '2',
          label: '选项2',
          children: [
            {
              value: '22',
              label: '选项22'
            }
          ]
        }
      ],
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'checkbox', // 控件类型
    icon: 'el-icon-tickets', // 图标
    label: '多选框', // 控件名字
    options: {
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      checkboxDefaultValue: [],
      chooseMin: 0,
      chooseMax: 3,
      dynamicKey: '',
      dynamic: false,
      options: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        },
        {
          value: '3',
          label: '选项3'
        }
      ],
      width: 100, // 宽度
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'radio', // 控件类型
    icon: 'el-icon-remove-outline', // 图标
    label: '单选框',
    options: {
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      defaultValue: null, // 默认值
      dynamicKey: '',
      dynamic: false,
      options: [
        {
          value: '1',
          label: '选项1'
        },
        {
          value: '2',
          label: '选项2'
        }
      ],
      width: 100, // 宽度
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'date', // 控件类型
    icon: 'el-icon-stopwatch', // 图标
    label: '日期选择器',
    options: {
      width: 100, // 宽度
      defaultValue: '', // 默认值，字符串 12:00:00
      rangeDefaultValue: ['', ''], // 默认值，字符串 12:00:00
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      placeholder: '请选择日期点',
      format: 'yyyy 年 MM 月 dd 日', // 展示格式
      isChooseTimes: '1', // 是否是选择一个时间段1是时间点
      valueFormat: 'timestamp', // 解析格式
      rangeSeparator: '至', // 时间段选择中间文字
      startPlaceholder: '开始日期', // 时间段选择前文字
      endPlaceholder: '结束日期', // 时间段选择后文字,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'datetime', // 控件类型
    icon: 'el-icon-date', // 图标
    label: '日期时间选择器',
    options: {
      width: 100, // 宽度
      defaultValue: '', // 默认值，字符串
      rangeDefaultValue: ['', ''], // 默认值，字符串
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      placeholder: '请选择日期时间',
      format: 'yyyy-MM-dd HH:mm:ss', // 展示格式
      isChooseTimes: '1', // 是否是选择一个时间段1是时间点
      valueFormat: 'yyyy-MM-dd HH:mm:ss', // 解析格式
      rangeSeparator: '至', // 时间段选择中间文字
      startPlaceholder: '开始日期', // 时间段选择前文字
      endPlaceholder: '结束日期', // 时间段选择后文字
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'time', // 控件类型
    icon: 'el-icon-date', // 图标
    label: '时间选择器',
    options: {
      isChooseTimes: '1', // 是否是选择一个时间段
      width: 100, // 宽度
      defaultValue: '', // 默认值，字符串 12:00:00
      clearable: false, // 是否显示清除按钮
      hidden: false, // 是否隐藏，false显示，true隐藏
      placeholder: '请选择时间点',
      format: 'HH:mm:ss', // 展示格式
      rangeSeparator: '至', // 时间段选择中间文字
      startPlaceholder: '开始时间', // 时间段选择前文字
      endPlaceholder: '结束时间', // 时间段选择后文字
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'uploadFile', // 控件类型
    icon: 'el-icon-upload2', // 图标
    label: '上传文件',
    options: {
      fileList: [],
      multiple: true,
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      width: 100,
      limit: 3,
      buttonText: '点击上传',
      warnText: '只能上传jpg/png文件，且不超过500kb',
      action: 'http://cdn.kcz66.com/uploadFile.txt',
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'uploadImg', // 控件类型
    icon: 'el-icon-picture-outline', // 图标
    label: '上传图片',
    options: {
      fileList: [],
      multiple: true,
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      width: 100,
      limit: 3,
      action: 'http://cdn.kcz66.com/uploadFile.txt',
      listType: 'picture-card',
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'button', // 控件类型
    icon: 'el-icon-thumb', // 图标
    label: '按钮',
    options: {
      width: 0,
      maxWidth: 80,
      buttonType: 'primary',
      handle: 'submit',
      disabled: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    key: ''
  },
  {
    type: 'switch', // 控件类型
    icon: 'el-icon-open', // 图标
    label: '开关',
    options: {
      switchValue: '1', // 默认值 Boolean 类型
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      activeText: '开',
      inactiveText: '关',
      width: 100,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'slider', // 控件类型
    icon: 'el-icon-set-up', // 图标
    label: '滑动输入条',
    options: {
      width: 100, // 宽度
      numberDefaultValue: 0, // 默认值， 如果range为true的时候，则需要改成数组,如：[12,15]
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长，取值必须大于 0，并且可被 (max - min) 整除
      showInput: true, // 是否显示输入框，range为true时，请勿开启
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  // {
  //   type: "tipsWindow",//控件类型
  //   icon: "el-icon-copy-document",//图标
  //   label: "弹出选择框",
  //   options: {
  //     width: 100, // 宽度
  //     defaultValue: "", // 默认值
  //     placeholder: "请输入", // 没有输入时，提示文字
  //     clearable: false,
  //     hidden: false, // 是否隐藏，false显示，true隐藏
  //     disabled: false // 是否禁用，false不禁用，true禁用
  //   },
  // },
  {
    type: 'childTable',
    label: '子表',
    icon: 'el-icon-menu',
    list: [],
    options: {
      pageIndex: 1,
      pageSize: 1000000,
      pageTotal: 0,
      pageSizes: [5, 10, 20, 50, 100],
      width: 100,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: ''
  },
  {
    type: 'p', // 控件类型
    icon: 'el-icon-notebook-2', // 图标
    label: '文字',
    options: {
      width: 100, // 宽度
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      disabled: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    }
  },
  {
    type: 'super', // 控件类型
    icon: 'el-icon-link', // 图标
    label: '超链接',
    options: {
      defaultValue: '点击这跳转', // 默认值
      url: 'https://gitee.com/zhuzl002/bpm-web', // 跳转连接
      width: 100,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    }
  },
  {
    type: 'tMKeditor', // 控件类型
    icon: 'el-icon-s-grid', // 图标
    label: '富文本',
    list: [],
    options: {
      height: 3,
      placeholder: '请输入',
      chinesization: true,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      showLabel: true,
      width: 100,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  }
]
// 布局控件
export const layoutList = [
  {
    type: 'divider',
    label: '分割线',
    icon: 'el-icon-minus',
    options: {
      orientation: 'left'
    },
    key: '',
    model: ''
  },
  {
    type: 'card',
    label: '卡片布局',
    icon: 'el-icon-postcard',
    list: [],
    key: '',
    model: '',
    options: {
    }
  },
  {
    type: 'grid',
    label: '栅格布局',
    icon: 'el-icon-s-grid',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0
    },
    key: '',
    model: ''
  },
  {
    type: 'table',
    label: '表格布局',
    icon: 'el-icon-menu',
    trs: [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ],
    options: {
      bordered: true,
      bright: false,
      small: true,
      customStyle: ''
    },
    key: '',
    model: ''
  },
  {
    type: 'tabs',
    label: '标签页布局',
    icon: 'el-icon-connection',
    options: {
      activeName: '1',
      type: 'card',
      tabPosition: 'top',
      gutter: 0
    },
    columns: [
      {
        value: '1',
        label: '选项1',
        list: []
      },
      {
        value: '2',
        label: '选项2',
        list: []
      }
    ],
    key: '',
    model: ''
  }
]

// 自定义组件
export const customList = [
  {
    type: 'progress', // 控件类型
    icon: 'el-icon-odometer', // 图标
    label: '进度条',
    list: [],
    options: {
      defaultPercentage: 0, // 百分比（必填）
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ], // 进度条背景色（会覆盖 status 状态颜色）
      status: 'success', // 进度条当前状态
      strokeWidth: 6, // 进度条的宽度，单位 px
      type: 'line', // 进度条类型
      circleWidth: 126, // 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）
      textInside: false, // 进度条显示文字内置在进度条内（只在 type=line 时可用）
      showText: true, // 是否显示进度条文字内容
      hidden: false, // 是否隐藏，false显示，true隐藏
      chinesization: true,
      disabled: false,
      clearable: false,
      showLabel: true,
      width: 100,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'colorPicker', // 控件类型
    icon: 'el-icon-chicken', // 图标
    label: '颜色选择器',
    options: {
      defaultValue: '#409EFF',
      size: 'default', // 尺寸
      showAlpha: false, 	// 是否支持透明度选择
      // colorFormat: 'hex', // 颜色的格式 hex（show-alpha 为 false）/ rgb（show-alpha 为 true）
      hidden: false, // 是否隐藏，false显示，true隐藏
      clearable: false,
      disabled: false, // 是否禁用，false不禁用，true禁用
      width: 100,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'customHtml', // 控件类型
    icon: 'el-icon-tickets', // 图标
    label: 'HTML',
    options: {
      defaultValue: '<strong>HTMLssssss</strong>',
      width: 100, // 宽度
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'customAlert', // 控件类型
    icon: 'el-icon-warning-outline', // 图标
    label: '警告提示',
    options: {
      defaultValue: '', // 标题
      type: 'success', // 主题
      description: '', // 辅助性文字。也可通过默认 slot 传入
      showIcon: false, // 是否显示图标
      center: false, // 文字是否居中
      closable: false, // 是否可关闭
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      width: 100,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
      ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'tree', // 表单类型
    label: '树形控件', // 标题文字
    icon: 'tree',
    options: {
      width: 100, // 宽度 百分比
      defaultValue: '',
      multipleDefaultValue: [],
      currentNodeKey: '', // 当前选中的节点
      checkOnClickNode: false, // 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。
      showCheckbox: false, // 节点是否可被选择
      checkStrictly: false, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      iconClass: '',
      accordion: false, // 是否每次只打开一个同级树节点展开
      defaultExpandAll: false, // 是否默认展开所有节点
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      indent: 16,
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      placeholder: '请选择',
      clearable: false, // 是否显示清除按钮
      dynamicKey: '',
      dynamic: true,
      nodeKey: 'id', // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
      defaultProps: JSON.stringify({
        children: 'children', // 子类字段
        label: 'label' // 标签字段
      }),
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ], // 动态事件下拉选项 需要原生控件支持
      options: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    },
    model: '',
    key: '',
    help: '',
    rules: [
      {
        required: false,
        message: '必填项'
      }
    ]
  },
  {
    type: 'iconSelect', // 控件类型
    icon: 'icon', // 图标
    label: '图标选择器',
    options: {
      placeholder: '点击选择图标',
      popoverWidth: 460, //  px
      width: 100,
      defaultValue: '', // 标题
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false, // 是否禁用，false不禁用，true禁用
      clearable: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'treeSelect', // 表单类型
    label: '树形选择控件', // 标题文字
    icon: 'tree',
    options: {
      width: 100, // 宽度 百分比
      defaultValue: 'a',
      multipleDefaultValue: [],
      multiple: false, // 设置 true为允许选择多个选项（又名多重选择模式）。
      appendToBody: false, // 将菜单追加到 <body />.
      clearable: true, // 是否显示清除按钮
      delimiter: ',', // 用于连接隐藏字段值的多个值的定界符。
      async: false,
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      required: false,
      searchable: true, // 是否启用搜索功能。
      showCount: false, // 是否显示子项计数在每个分支节点的标签旁边。
      placeholder: '请选择',
      dynamicKey: '',
      dynamic: true,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ], // 动态事件下拉选项 需要原生控件支持
      options: [{
        id: 'a',
        label: 'a',

        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      }]
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'childTablePage',
    label: '子表(分页)',
    icon: 'el-icon-menu',
    list: [],
    currentPageList: [],
    options: {
      pageIndex: 1,
      pageSize: 10,
      pageTotal: 0,
      pageSizes: [5, 10, 20, 50, 100],
      width: 100,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ] // 动态事件下拉选项 需要原生控件支持 动态事件下拉选项
    },
    model: '',
    modelPage: '',
    key: ''
  },
  {
    type: 'organTreeSelect', // 表单类型
    label: '组织架构选择控件', // 标题文字
    icon: 'tree',
    options: {
      width: 100, // 宽度 百分比
      organType: 'organDept', // organ 公司 organDept 部门 organUser 机构人员
      defaultValue: '',
      multipleDefaultValue: [],
      multiple: false, // 设置 true为允许选择多个选项（又名多重选择模式）。
      appendToBody: false, // 将菜单追加到 <body />.
      clearable: true, // 是否显示清除按钮
      delimiter: ',', // 用于连接隐藏字段值的多个值的定界符。
      async: false,
      disabled: false, // 是否禁用
      hidden: false, // 是否隐藏，false显示，true隐藏
      required: false,
      searchable: true, // 是否启用搜索功能。
      showCount: false, // 是否显示子项计数在每个分支节点的标签旁边。
      placeholder: '请选择',
      dynamicKey: '',
      dynamic: true,
      customStyle: '', // 自定义css
      dynamicFun: // 动态方法
        ``,
      eventName: 'change', // 触发动态方法事件名称
      eventNameOptions: [
        { 'label': 'change', 'value': 'change' },
        { 'label': 'click', 'value': 'click' },
        { 'label': 'blur', 'value': 'blur' },
        { 'label': 'dblclick', 'value': 'dblclick' },
        { 'label': 'focus', 'value': 'focus' },
        { 'label': 'mouseout', 'value': 'mouseout' },
        { 'label': 'mouseover', 'value': 'mouseover' },
        { 'label': 'submit', 'value': 'submit' },
        { 'label': 'reset', 'value': 'reset' }
      ], // 动态事件下拉选项 需要原生控件支持
      options: []
    },
    model: '',
    key: '',
    rules: [
      {
        required: false,
        message: '必填项',
        trigger: 'blur'
      }
    ]
  }
]

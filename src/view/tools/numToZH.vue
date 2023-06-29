<template>
  <div>
    <div class="tiitle">输入数字,点击按钮,会将数字转换成中文读法<br>(支持万亿以下)</div>
    <div class="tiptop">
      <el-input :maxlength="12" clearable  class="input_width" type="text" onkeyup="value=value.replace(/\D/g,'')" v-model.trim="ZHKey"></el-input>
      <el-button @click="submitIt(ZHKey)">转换</el-button>
    </div>
    <div class="chage" v-if="beforChange.length>0">转换后 : {{ beforChange }}</div>
  </div>
</template>

<script>
export default {
  name: 'VueAdminNumToZH',
};
</script>
<script setup>
import { ref } from 'vue';
import { string_to_strArray } from '../../js/jsFun.js'

const ZHKey = ref('');
const beforChange = ref('');
const unit = ref(['仟', '佰', '拾', '']);
const unit_big = ref(['亿', '万', '']);
const chineseNum = ref([
  '零',
  '壹',
  '贰',
  '叁',
  '肆',
  '伍',
  '陆',
  '柒',
  '捌',
  '玖'
]);
function submitIt(data) {
  console.log('data',data)
  // 获取截取的字符串数组
  let strArray = string_to_strArray(data, 4);
  // 存放转换完成后的文字数组
  let areat = [];
  // 循环
  strArray.map((changeArr, index) => {
    // 每次循环生成的文字
    let lastdata = '';
    // 遍历数字字符串
    for (let i = 0; i < changeArr.length; i++) {
      if (changeArr[i] == 0 && changeArr[i - 1] == 0) {
        // 当前位置和上一位都是0,不做任何操作
      }
      else if (changeArr[i] == 0) {
        // 当前是0,不需要带单位
        lastdata += chineseNum.value[changeArr[i]];
      }
      else {
        // 当前数据加上单位
        lastdata += chineseNum.value[changeArr[i]] + unit.value[4 - (changeArr.length - i)];
      }
    }
    // 最后一位是零 清理掉
    if (lastdata.lastIndexOf('零') == lastdata.length - 1) {
      lastdata = lastdata.slice(0, lastdata.length - 1);
    }
    if (lastdata.lastIndexOf('零') == 0) {
      lastdata.slice(0, 1);
    }
    // 当前字符串全零则跳过大单位 (万)
    if (lastdata.length != 0) {
      areat.push(lastdata + unit_big.value[3 - (strArray.length - index)]);
    }
  })
  // 赋值
  beforChange.value = areat.join(' ');
}

</script>

<style lang="less" scoped>
.input_width {
  width: 200px;
  margin-right: 20px;
}

.tiptop {
  margin-top: 20px;
}
.chage{
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>

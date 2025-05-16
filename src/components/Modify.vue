<template>
  <h2>武将信息修改</h2>
  <t-space
    direction="vertical"
    style="text-align: left"
  >
    <!-- 基础信息 -->
    <t-space direction="vertical">
      <t-form labelAlign="left">
        <t-form-item label="id">
          <t-input
            v-model="formData.id"
            placeholder="请输入武将ID"
          />
        </t-form-item>
        <t-form-item label="姓名">
          <t-input
            v-model="formData.name"
            placeholder="请输入姓名"
          />
        </t-form-item>
        <t-form-item label="势力">
          <t-select
            v-model="formData.country"
            :options="factionOptions"
          />
        </t-form-item>
        <t-form-item label="性别">
          <t-select
            v-model="formData.sex"
            :options="genderOptions"
          />
        </t-form-item>
        <t-form-item label="体力值">
          <t-input-number
            v-model="formData.hp"
            :min="1"
          />
        </t-form-item>
        <t-form-item label="技能数">
          <t-input-number
            v-model="formData.skill"
            :min="1"
          />
        </t-form-item>
      </t-form>
    </t-space>

    <t-space>
      <t-form labelAlign="left">
        <t-form-item label="技能类型">
          <t-check-tag-group
            v-model="formData.skillType"
            :options="typeOptions"
            :unchecked-props="TYPE_PROPS"
            multiple
          />
        </t-form-item>
        <t-form-item label="技能标签">
          <t-check-tag-group
            v-model="formData.skillTag"
            :options="tagOptions"
            :unchecked-props="TYPE_PROPS"
            multiple
          />
        </t-form-item>
      </t-form>
    </t-space>

    <t-space>
      <t-button
        theme="primary"
        @click="addTag"
      >
        修改标签
      </t-button>
      <t-button
        theme="primary"
        @click="create"
      >
        新增
      </t-button>
      <t-button
        theme="primary"
        @click="next"
      >
        下一个
      </t-button>
    </t-space>
  </t-space>
</template>

<script lang="tsx" setup>
import axios from 'axios'
import type { CheckTagGroupProps } from 'tdesign-vue-next'

const TYPE_PROPS: CheckTagGroupProps['uncheckedProps'] = {
  theme: 'default',
  variant: 'outline'
}

// 基础表单数据
const formData = ref({
  name: '刘备',
  id: 1,
  country: 2,
  sex: 1,
  hp: 4,
  skill: 2,
  skillType: [],
  skillTag: []
})

// 势力选项
const factionOptions = [
  { label: '魏', value: 1 },
  { label: '蜀', value: 2 },
  { label: '吴', value: 3 },
  { label: '群', value: 4 },
  { label: '神', value: 5 },
  { label: '晋', value: 6 }
]

// 性别选项
const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

const typeOptions: CheckTagGroupProps['options'] = [
  {
    label: '锁定技',
    value: '锁定技'
  },
  {
    label: '限定技',
    value: '限定技'
  },
  {
    label: '主公技',
    value: '主公技'
  },
  {
    label: '觉醒技',
    value: '觉醒技'
  },
  {
    label: '隐匿技',
    value: '隐匿技'
  },
  {
    label: '转换技',
    value: '转换技'
  },
  {
    label: '宗族技',
    value: '宗族技'
  },
  {
    label: '多锁定技',
    value: '多锁定技'
  }
]

const tagOptions: CheckTagGroupProps['options'] = [
  {
    label: '出牌阶段',
    value: '出牌阶段'
  },
  {
    label: '转化',
    value: '转化'
  },
  {
    label: '【杀】',
    value: '【杀】'
  },
  {
    label: '视为',
    value: '视为'
  },
  {
    label: '判定',
    value: '判定'
  },
  {
    label: '受到伤害',
    value: '受到伤害'
  },
  {
    label: '回复',
    value: '回复'
  },
  {
    label: '摸牌',
    value: '摸牌'
  },
  {
    label: '拼点',
    value: '拼点'
  },
  {
    label: '翻面',
    value: '翻面'
  },
  {
    label: '移除',
    value: '移除'
  },
  {
    label: '标记',
    value: '标记'
  },
  {
    label: '获得技能',
    value: '获得技能'
  },
  {
    label: '技能伤害',
    value: '技能伤害'
  },
  {
    label: '失去体力',
    value: '失去体力'
  }
]

const addTag = async () => {
  const res = await axios({
    url: 'http://localhost:5002/addtag',
    method: 'post',
    data: {
      id: formData.value.id,
      type: formData.value.skillType,
      tag: formData.value.skillTag,
      version: 'ol'
    }
  })

  if (res.data.code === 0) {
    next()
  } else {
    next()
  }
}

const create = () => {
  axios({
    url: 'http://localhost:5002/create',
    method: 'post',
    data: {
      character: formData.value
    }
  })
}

const next = async () => {
  const res = await axios({
    url: 'http://localhost:5002/next',
    method: 'get',
    params: {
      id: formData.value.id
    }
  })

  if (res.data.code === 0) {
    const data = res.data.data
    formData.value = data
    formData.value.skillType = Array.from(new Set(data.skillType))
    formData.value.skillTag = Array.from(new Set(data.skillTag))
  } else {
    alert(res.data.msg)
  }
}
</script>

<style scoped></style>

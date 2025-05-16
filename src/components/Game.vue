<template>
  <div class="game-info">
    <t-button
      theme="success"
      shape="round"
      variant="outline"
      @click="showAnswer"
    >
      查看答案
    </t-button>
    <t-tag
      shape="round"
      size="large"
      variant="outline"
      theme="warning"
    >
      剩余次数: {{ gameInfo.guessLeft }}
    </t-tag>
  </div>
  <div class="game">
    <t-base-table
      hover
      size="large"
      row-key="index"
      :data="gameInfo.tableData"
      :columns="columns"
    ></t-base-table>
  </div>

  <t-dialog
    v-model:visible="visible"
    mode="modeless"
    draggable
    destroyOnClose
    header="查看答案"
    width="40%"
    :footer="false"
    :on-before-open="onBeforeOpen"
    :on-close="close"
  >
    <img
      crossorigin="anonymous"
      :src="url"
      class="character"
    />
  </t-dialog>
</template>

<script lang="tsx" setup>
import { type ButtonProps, type DialogProps, type TableProps, type TableRowData } from 'tdesign-vue-next'
import { useGameStore } from '../store'
import type { GuessData } from '../types/api'

const { gameInfo, play } = useGameStore()

const countrys = {
  1: '魏',
  2: '蜀',
  3: '吴',
  4: '群',
  5: '神',
  6: '晋'
}

const columns: TableProps<Partial<GuessData> & TableRowData>['columns'] = [
  {
    colKey: 'name',
    title: '名字',
    align: 'left',
    width: '15%',
    cell: (_h, { row }) => (
      <div>
        <img
          crossorigin="anonymous"
          src={`https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/skinShop/${row.id?.value}00.png`}
          class="character-icon"
        />
        <t-tag
          class={row.name?.class}
          size="large"
        >
          {row.name?.value}
        </t-tag>
      </div>
    )
  },
  {
    colKey: 'country',
    title: '势力',
    align: 'center',
    cell: (_h, { row }) => (
      <t-tag
        class={row.country?.class}
        size="large"
      >
        {countrys[row.country?.value as keyof typeof countrys]}
      </t-tag>
    )
  },
  {
    colKey: 'sex',
    title: '性别',
    align: 'center',
    cell: (_h, { row }) => (
      <t-tag
        class={row.sex?.class}
        size="large"
      >
        {row.sex?.value === 1 ? '男' : '女'}
      </t-tag>
    )
  },
  {
    colKey: 'hp',
    title: '体力',
    align: 'center',
    cell: (_h, { row }) => (
      <t-tag
        class={row.hp?.class}
        size="large"
      >
        {row.hp?.value}
      </t-tag>
    )
  },
  {
    colKey: 'skill',
    title: '技能数量',
    align: 'center',
    width: '15%',
    cell: (_h, { row }) => (
      <t-tag
        class={row.skill?.class}
        size="large"
      >
        {row.skill?.value}
      </t-tag>
    )
  },
  {
    colKey: 'skillType',
    title: '技能类型',
    align: 'center',
    width: '20%',
    cell: (_h, { row }) =>
      row.skillType?.map((item: any) => (
        <t-tag
          size="small"
          shape="round"
          class={item.class ? item.class : 'default'}
        >
          {item.value}
        </t-tag>
      ))
  },
  {
    colKey: 'skillTag',
    title: '技能标签',
    align: 'center',
    width: '25%',
    cell: (_h, { row }) =>
      row.skillTag?.map((item: any) => (
        <t-tag
          size="small"
          shape="round"
          class={item.class ? item.class : 'default'}
        >
          {item.value}
        </t-tag>
      ))
  }
]

const visible = ref(false)
const url = ref('')

const showAnswer: ButtonProps['onClick'] = () => {
  visible.value = true
}

const onBeforeOpen: DialogProps['onBeforeOpen'] = () => {
  url.value = `https://web.sanguosha.com/220/h5_2/res/runtime/pc/general/big/static/${gameInfo.value.answer}00.png`
}

const close: DialogProps['onClose'] = () => {
  NotifyPlugin.success({ title: '通知', content: '已重置游戏', closeBtn: true, duration: 3000 })
  play()
}

onMounted(() => {
  play()
})

watchEffect(() => {
  if (gameInfo.value.gameover) visible.value = true
})
</script>

<style>
.game-info {
  display: flex;
  gap: 6px;
}

.game {
  width: 100%;
  margin-top: 1rem;
  background-color: var(--td-bg-color-container);
  border-radius: 12px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  text-align: center;
}

@media screen and (min-width: 1200px) {
  .game {
    width: 85%;
  }
}

.game th {
  background: var(--td-brand-color-2);
  color: var(--td-text-color-primary);
}

.game .correct {
  background-color: var(--td-success-color-2);
}

.game .partial {
  background-color: var(--td-warning-color-2);
}

.character-icon {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
  display: inline-block;
  vertical-align: bottom;
}

.character {
  width: 350px;
  object-fit: cover;
}
</style>

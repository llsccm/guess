<template>
  <div class="search-card">
    <div>输入猜测</div>
    <t-space
      direction="vertical"
      class="search"
    >
      <t-auto-complete
        v-model="inputValue"
        :options="options"
        clearable
        size="large"
        :popup-props="{ overlayClassName: 'option-list' }"
        placeholder="搜索武将"
        @change="handelSearch"
        @select="handelSelect"
      >
        <template #option="{ option }">
          <div class="option">
            <img
              :src="option.avatar"
              crossorigin="anonymous"
            />
            <div class="option__main">
              <t-highlight-option
                :content="option.text"
                :keyword="inputValue"
              />
            </div>
          </div>
        </template>
      </t-auto-complete>

      <t-button
        theme="default"
        shape="round"
        @click="handelGuess"
      >
        猜猜看
      </t-button>
    </t-space>
  </div>
</template>

<script setup lang="ts">
import type { AutoCompleteProps } from 'tdesign-vue-next'
import { useGameStore } from '../store'
const { gameInfo, search, handelSelect, guess } = useGameStore()

const inputValue = ref('')
const options = ref<AutoCompleteProps['options']>([])

function handelGuess() {
  if (gameInfo.value.currentSelection === 0 || gameInfo.value.answer === 0) return
  guess()
}

let timer = 0

function handelSearch(value: string) {
  clearTimeout(timer)
  if (value === '') return

  timer = setTimeout(async () => {
    options.value = await search(value)
  }, 300)
}
</script>

<style>
.search-card {
  width: 65%;
  margin: 1rem 0 1.5rem;
  padding: 12px 24px 24px;
  background-color: var(--td-bg-color-container);
  border-radius: 12px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.search {
  width: 90%;
  margin: 12px auto;
  align-items: center;
}

.option-list .t-select-option {
  height: 50px;
}

.option-list .option {
  display: flex;
  align-items: center;
}

.option-list .option > img {
  max-height: 40px;
  border-radius: 50%;
}

.option-list .option__main {
  margin-left: 8px;
}

.option-list .option .description {
  color: var(--td-gray-color-9);
}
</style>

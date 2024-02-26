<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 1024 1024"
  >
    <path fill="#747480" d="m192 384l320 384l320-384z"></path>
  </svg>
</template>

<script lang="ts">
export default {
  name: "EpCaretBottom",
};
</script>
<style scoped lang="less">
svg {
  width: 1.5em;
  height: 1.5em;
  &:hover {
    background: var(--color-disabled);
    border-radius: 50%;
  }
}
</style>

<template>
  <div class='ranking-list'>
    <RankBanner/>
    <RankTab/>
  </div>
</template>

<script>
  import RankBanner from '@/components/RankBanner.vue'
  import RankTab from '@/components/RankTab.vue'

  export default {
    name: 'rankingList',
    components: {
      RankBanner,
      RankTab
    }
  }
</script>

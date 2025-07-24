<template>
  <router-view/>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar{
  width: 2px;
  height: 2px;
  position: absolute;

}

::-webkit-scrollbar-thumb{
  background: gray;
}

::-webkit-scrollbar-track{
  background-color: #ddd;
}
</style>

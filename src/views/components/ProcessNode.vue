<template>
    <div
        class="node-item"
        :class="['c-' + curData.status, 'bl-' + curData.status]"
    >
        <span class="label">{{ curData.label }}</span>
        <i
            class="el-icon-success fs-16"
            v-if="curData.status === 'success'"
        ></i>
        <i
            class="el-icon-error fs-16"
            v-else-if="curData.status === 'failed'"
        ></i>
        <i class="el-icon-refresh-right fs-16 rotate" v-else></i>
    </div>
</template>

<script>
export default {
    inject: ["getGraph", "getNode"],
    data() {
        return {
            curData: {},
        };
    },
    mounted() {
        const self = this;
        const node = this.getNode();
        const graph = this.getGraph();
        console.log(node.data);
        this.curData = node.data;
        // 监听数据改变事件
        node.on("change:data", ({ current }) => {
            console.log(current);
            self.curData = node.data;
        });
    },
};
</script>

<style scoped>
.node-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 180px;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    background-color: #fff;
    border: 1px solid #c2c8d5;
    border-radius: 4px;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 6%);
    box-sizing: border-box;
    font-size: 16px;
}
.fs-16 {
    font-size: 16px;
}
.node-item .label {
    color: #666666;
}
.c-default {
    color: #5f95ff;
}
.c-running {
    color: #5f95ff;
}
.c-success {
    color: #52c41a;
}
.c-failed {
    color: #ff4d4f;
}
.bl-default {
    border-left: 4px solid #5f95ff;
}
.bl-running {
    border-left: 4px solid #5f95ff;
}
.bl-success {
    border-left: 4px solid #52c41a;
}
.bl-failed {
    border-left: 4px solid #ff4d4f;
}
.rotate {
    animation: rotateItem 1s linear infinite;
}
@keyframes rotateItem {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
>

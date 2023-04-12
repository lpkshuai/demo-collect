<template>
    <div>
        <div>
            <div>{{ drag ? "拖拽中" : "拖拽停止" }}</div>
            <!--使用draggable组件-->
            <!-- <draggable
                v-model="myArray"
                chosenClass="chosen"
                forceFallback="true"
                group="people"
                animation="500"
                @start="onStart"
                @end="onEnd"
            >
                <transition-group>
                    <div
                        class="item"
                        v-for="element in myArray"
                        :key="element.id"
                    >
                        {{ element.name }}
                    </div>
                </transition-group>
            </draggable> -->
        </div>
        <div class="code-container">
            <div>
                <draggable
                    v-model="myArrayL"
                    forceFallback="true"
                    group="code"
                    animation="1000"
                    @start="onStart"
                    @end="onEnd"
                >
                    <transition-group>
                        <div
                            class="code-box"
                            v-for="item in myArrayL"
                            :key="item.id"
                        >
                            <codemirror
                                class="code"
                                ref="mycode"
                                v-model="item.name"
                                :options="cmOptions"
                            >
                            </codemirror>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div>
                <draggable
                    v-model="myArrayR"
                    forceFallback="true"
                    group="code"
                    animation="1000"
                    @start="onStart"
                    @end="onEnd"
                >
                    <transition-group>
                        <div
                            class="code-box"
                            v-for="item in myArrayR"
                            :key="item.id"
                        >
                            <codemirror
                                class="code"
                                ref="mycode"
                                v-model="item.name"
                                :options="cmOptions"
                            >
                            </codemirror>
                        </div>
                    </transition-group>
                </draggable>
            </div>

            <!-- <codemirror
                ref="mycode"
                v-model="curCode"
                :options="cmOptions"
                class="code"
            >
            </codemirror> -->
            <!-- <div class="code-btn">
                <span @click="clearCode">清除</span>
                <span @click="saveCode">保存</span>
            </div> -->
        </div>
    </div>
</template>
<script>
//导入draggable组件
import draggable from "vuedraggable";
import { codemirror } from "vue-codemirror";
import "codemirror/theme/ambiance.css"; // 主题样式
require("codemirror/mode/javascript/javascript"); // 模式的js
export default {
    //注册draggable组件
    components: {
        draggable,
        codemirror,
    },
    data() {
        return {
            drag: false,
            //定义要被拖拽对象的数组
            myArrayL: [
                { id: 1, name: "{a:itxst}" },
                { id: 2, name: "baidu" },
                { id: 3, name: "taobao" },
                { id: 4, name: "google" },
            ],
            myArrayR: [
                { id: 5, name: "1" },
                { id: 6, name: "2" },
                { id: 7, name: "3" },
                { id: 8, name: "4" },
            ],
            curCode: "",
            cmOptions: {
                value: "",
                // mode: "text/x-python",
                mode: "text/javascript",
                theme: "ambiance",
                readOnly: false,
                showCursorWhenSelecting: true,
                lineNumbers: false,
            },
        };
    },
    methods: {
        //开始拖拽事件
        onStart() {
            this.drag = true;
        },
        //拖拽结束事件
        onEnd() {
            this.drag = false;
            console.log(this.myArrayL);
        },
        file2string(file) {
            let _this = this;
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function() {
                _this.curCode = reader.result;
            };
        },
    },
};
</script>
<style scoped>
/*被拖拽对象的样式*/
.item {
    padding: 6px;
    background-color: #fdfdfd;
    border: solid 1px #eee;
    margin-bottom: 10px;
    cursor: move;
}
/*选中样式*/
.chosen {
    border: solid 2px #3089dc !important;
}
.code-container {
    display: flex;
}
.code-box {
    /* display: inline-block; */
    width: 400px;
    height: 300px;
    text-align: left;
    /* background: #ccc; */
}
</style>

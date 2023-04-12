<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "Home",
    components: {
        HelloWorld,
    },
    created() {
        // this.$request.ajax({
        //     request: {
        //         url: "http://8.129.70.251:18080/openapi/v1/identities/uaid/sign",
        //         method: "post",
        //         data: "",
        //     },
        //     success: function(res) {
        //         // let result = res.result;
        //         console.log(res);
        //     },
        //     error: function(res) {
        //         console.log(res);
        //     },
        // });
    },
};
</script>

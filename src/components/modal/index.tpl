<div class="m-modal" @touchmove="$event.preventDefault()" v-show="visible">
    <div class="m-modal__inner">
        <header class="m-modal__hd">{{title}}</header>
        <section class="m-modal__bd" v-html="content"></section>
        <footer class="m-modal__ft">
            <button class="btn btn--primary"
                @click="ok">
                {{okText}}
            </button>
            <button class="btn btn--gray"
                @click="cancel"
                v-if="type ==='confirm'">
                {{cancelText}}
            </button>
        </footer>
    </div>
</div>
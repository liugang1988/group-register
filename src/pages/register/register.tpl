<div class="g-in">
    <header class="p-index__hd">
        <img src="images/logo.png">
        <h1>专业的才艺教学服务平台</h1>
    </header>
    <ui-form class="p-index__bd" type="v">
        <ui-form-item 
            label="手机号码：" 
            :tips="getErrorText($v.mobile, msg.mobile) ||　checkMobileText"
            :state='$v.mobile.$error || !!checkMobileText'
        >
            <input 
                class="u-input-text g-col g-col-span-24" 
                type="text" 
                placeholder="可用于登录和找回密码" 
                @blur="checkPhone(mobile)"
                @focus="changePhone"
                v-model="mobile">
        </ui-form-item>
        <ui-form-item 
            label="验证码：" 
            :tips="getErrorText($v.code, msg.code)" 
            :state='$v.code.$error'>
            <input 
                class="u-input-text g-col g-col-span-15" 
                type="text" 
                placeholder="请输入验证码"
                @blur="$v.code.$touch()"
                @focus="$v.code.$reset()"
                v-model="code"><ui-button 
                type="gray2"
                class="g-col g-col-span-8 g-col-offset-1"
                @click.native="getCode" 
                :disabled="isGetCode">
                {{isGetCode || times?'倒计时'+times+'秒':'获取验证码'}}    
            </ui-button>
        </ui-form-item>
        <ui-form-item 
            label="密码：" 
            :tips="getErrorText($v.password, msg.password)" 
            :state='$v.password.$error'>
            <input 
                class="u-input-text  g-col g-col-span-24" 
                type="password" 
                placeholder="请设置登录密码" 
                @blur="$v.password.$touch()"
                @focus="$v.password.$reset()"
                v-model="password">
        </ui-form-item>
        <ui-form-item 
            label="再次输入：" 
            :tips="getErrorText($v.repeatPassword, msg.repeatPassword)" 
            :state='$v.repeatPassword.$error'>
            <input 
                class="u-input-text  g-col g-col-span-24" 
                type="password" 
                placeholder="请再次输入登录密码" 
                @blur="$v.repeatPassword.$touch()"
                @focus="$v.repeatPassword.$reset()"
                v-model="repeatPassword">
        </ui-form-item>
        <ui-form-item>
            <ui-button 
                type="primary"
                class="btn--block"
                @click.native="submit">确定</ui-button>
            <div class="f-tar f-mt20">
                <ui-button class="btn btn--link" @click.native="goLogin">登录</ui-button>
            </div>
        </ui-form-item>
    </ui-form>
</div>
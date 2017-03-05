<div class="p-password">
    <header class="password__hd">
        <div class="g-in">
            <img src="images/logo.png?__sprite">
        </div>
    </header>
    <div class="g-in">
        <!-- 步骤 -->
        <div class="m-box m-step" style="padding-left: 237px;">
            <div class="step-item z-active">
                <div class="f-tac">1.基本信息</div>
                <div class="flag"></div>
            </div>
            <div class="step-item" :class="{'z-active' : isStep2 || isStep3}">
                <div class="f-tac">2.身份验证</div>
                <div class="flag"></div>
            </div>
            <div class="step-item" :class="{'z-active' : isStep3}">
                <div class="f-tac">3.完成</div>
                <div class="flag"></div>
            </div>
        </div>
        <div class="m-box">
            <ui-form class="password__bd" type="v" v-if="isStep1">
                <ui-form-item 
                    label="账户名：" 
                    :tips="getErrorText($v.mobile, msg.mobile) ||　checkMobileText"
                    :state='$v.mobile.$error || !!checkMobileText'
                >
                    <input 
                        class="u-input-text g-col g-col-span-16" 
                        type="text" 
                        placeholder="请输入您需要找回登录密码的账号" 
                        @blur="checkPhone(mobile)"
                        @focus="changePhone"
                        v-model="mobile">
                </ui-form-item>
                <ui-form-item 
                    label="验证码：" 
                    :tips="getErrorText($v.imgCode, msg.imgCode) || checkImgCodeText" 
                    :state='$v.imgCode.$error || !!checkImgCodeText'>
                    <input 
                        class="u-input-text g-col g-col-span-9" 
                        type="text" 
                        placeholder="请输入验证码"
                        @blur="$v.imgCode.$touch()"
                        @focus="resetImgCode"
                        v-model="imgCode">
                    <img class="code-img g-col g-col-span-6 g-col-offset-1" :src="'data:image/jpg;base64,'+codeImg" @click="changeCode">
                    <div class="verification-code g-col g-col-span-7 f-ml10 f-mt10">
                        看不清？<a class="btn--link" @click="changeCode">换一张</a>
                    </div>
                </ui-form-item>
                <ui-form-item>
                    <ui-button 
                        type="primary"
                        class="g-col g-col-span-16"
                        @click.native="next()">确  定</ui-button>
                </ui-form-item>
            </ui-form>
            <ui-form class="password__bd" type="v" v-if="isStep2">
                <ui-form-item 
                    label="手机号码：" 
                >
                    <div class="f-mt10" v-text="hideMobile(mobile)"></div>
                </ui-form-item>
                <ui-form-item 
                    label="短信验证码：" 
                    :tips="getErrorText($v.code, msg.code) || checkCodeText" 
                    :state='$v.code.$error || !!checkCodeText'>
                    <input 
                        class="u-input-text g-col g-col-span-8" 
                        type="text" 
                        placeholder="请输入验证码"
                        @blur="$v.code.$touch()"
                        @focus="resetCode"
                        v-model="code">
                    <ui-button 
                        type="primary"
                        class="g-col g-col-span-7 g-col-offset-1"
                        @click.native="getCode" 
                        :disabled="isGetCode">
                        {{isGetCode || times?'倒计时'+times+'秒':'获取短信验证码'}}
                    </ui-button>
                </ui-form-item>
                </ui-form-item>
                <ui-form-item>
                    <ui-button 
                        type="primary"
                        class="g-col g-col-span-16"
                        @click.native="submit">确  定</ui-button>
                </ui-form-item>
            </ui-form>
            <div class="password__bd f-tac" v-if="isStep3">
                <i class="icon-success2"></i>
                <div class="strong f-mt10">重置密码成功！</div>
                <div>新密码将会以短信形式发送到{{hideMobile(mobile)}}！</div>
                <ui-button type="primary f-mt20" @click.native="goLogin">去登录</ui-button>
            </div>
        </div>            
    </div>
</div>
    
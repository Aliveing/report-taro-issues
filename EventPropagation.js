import Taro from '@tarojs/taro';
import React, { Component }  from 'react';
import { View, Text } from '@tarojs/components';
class A extends Component {

    onTapParent = (event) => {
        // event.stopPropagation(); // 打开父元素的阻止冒泡后，冒泡多次的只减少冒泡一次，比如五级嵌套的打开后冒泡两次
        console.log('tapping parent', event.currentTarget.id);
    }

    onTapChild = (event) => {
        event.stopPropagation();
        console.log('tapping child');
    }

    render() {
        const styles = "background-color: tomato; padding: 10px; margin-top: 50px; color: white";
        return <View style="background-color: skyblue; padding: 20px; text-align: center">

            <View style="text-align: left">Parent</View>

            {/* 事件冒泡的写法，三级事件嵌套，冒泡一次 */}
            <View onClick={this.onTapParent}>
                <View onClick={this.onTapParent}>
                    <Text style={styles} onClick={this.onTapChild}>Child 三级事件嵌套冒泡(1次)</Text>
                </View>
            </View>

            {/* 事件冒泡的写法，四级事件嵌套，冒泡两次 */}
            <View style="margin-top:30px" onClick={this.onTapParent}>
                <View onClick={this.onTapParent}>
                    <View onClick={this.onTapParent}>
                        <Text style={styles} onClick={(event) => this.onTapChild(event)}>Child 四级事件嵌套冒泡(2次)</Text>
                    </View>
                </View>
            </View>

            <View style="margin-top:30px" onClick={this.onTapParent}>
                <View onClick={this.onTapParent}>
                    <View onClick={this.onTapParent}>
                        <View onClick={this.onTapParent}>
                            <Text style={styles} onClick={(event) => this.onTapChild(event)}>Child 五级事件嵌套冒泡(3次)</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* 事件不冒泡的写法，三级嵌套顶层节点 bind 指针/父节点箭头函数 */}
            <View style="margin-top:30px" onClick={this.onTapParent.bind(this)}>
                <View onClick={this.onTapParent}>
                    <Text style={styles} onClick={this.onTapChild}>Child 三级嵌套顶层节点bind指针不冒泡</Text>
                </View>
            </View>

            {/* 事件冒泡的写法，四级嵌套顶层节点 bind 指针/父节点箭头函数 */}
            <View style="margin-top:30px" onClick={this.onTapParent.bind(this)}>
                {/* <View onClick={this.onTapParent.bind(this)}> 第二级改成bind不冒泡*/}
                <View onClick={this.onTapParent}>
                    <View onClick={this.onTapParent}>
                        <Text style={styles} onClick={this.onTapChild}>Child 四级嵌套顶层节点bind指针冒泡</Text>
                    </View>
                </View>
            </View>

            {/* 事件不冒泡的写法，两级嵌套不冒泡 */}
            <View style="margin-top:30px" onClick={this.onTapParent}>
                <Text style={styles} onClick={this.onTapChild}>Child 两级嵌套不冒泡</Text>
            </View>

        </View>
    }
}
export default A;

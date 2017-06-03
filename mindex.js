
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    PanResponder,
    Animated,
    UIManager
} from 'react-native';
var { width, height } = Dimensions.get('window');
const proptypes = {
    style: PropTypes.object,
    defaultLocation: PropTypes.number,
    trackBarStyle: PropTypes.object,
    trackBarBackgroundColor: PropTypes.string,
    trackBarRightColor: PropTypes.string,
    thumbStyle: PropTypes.object,
    Pic: PropTypes.element
}
export default class Slider extends Component {
    constructor(props) {
        super(props);
        let defaultLocation = this.props.defaultLocation == undefined ? 0 : this.props.defaultLocation > 1 ? 1 : this.props.defaultLocation < 0 ? 0 : this.props.defaultLocation;
        console.log(defaultLocation)
        this.state = {
            leftLength: defaultLocation
        }
        this.layout = { x: 0, y: 0, height: 0, width: 0 };
        this.trackBarlayout = { x: 0, y: 0, height: 0, width: 0 };
        this.trackBarLength = 0;
    }
    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                if (evt.nativeEvent.pageX < this.trackBarlayout.x) {
                    this.setState({ leftLength: 0 });
                    this.props.onDrag(0); return;
                }
                else if (evt.nativeEvent.pageX > this.trackBarlayout.x + this.trackBarLength) {
                    this.setState({ leftLength: 1 });
                    this.props.onDrag(1); return;
                }
                else {
                    let l = (evt.nativeEvent.pageX - this.trackBarlayout.x) / this.trackBarLength
                    this.setState({ leftLength: l })
                    this.props.onDrag(this.state.leftLength);
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                this.props.endDrag(this.state.leftLength);
            }

        });


        this.trackBarResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                let currentx = evt.nativeEvent.pageX;
                if (currentx <= this.trackBarlayout.x + this.trackBarLength && currentx >= this.trackBarlayout.x) {
                    let l = (evt.nativeEvent.pageX - this.trackBarlayout.x) / this.trackBarLength;
                    this.setState({ leftLength: l });
                    this.props.endDrag(this.state.leftLength);
                }
            },
        })
    }
    render() {
        return (
            <View style={[{ height: 40, width: width * 0.75, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000000' }, this.props.style]}
                onLayout={(e) => {
                    UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                        this.layout = { x: pageX, y: pageY, width: width, height: height }
                    })
                    this.layout = e.nativeEvent.layout; console.log(this.layout)
                }}>
                <View style={[{ height: 10, width: width * 0.65, flexDirection: 'row', justifyContent: 'center' }, this.props.trackBarStyle]}
                    {...this.trackBarResponder.panHandlers}
                    onLayout={(e) => {
                        this.trackBarLength = e.nativeEvent.layout.width;
                        {
                            UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
                                this.trackBarlayout = { x: pageX, y: pageY, width: width, height: height }
                                this.setState({})
                            })
                        }
                    }}
                >
                    <View style={[{ borderRadius: this.props.trackBarStyle.height * 0.5, backgroundColor: '#FFC125', width: this.state.leftLength * this.trackBarLength, height: this.props.trackBarStyle.height },
                    { backgroundColor: this.props.trackBarBackgroundColor }]} />
                    <View style={[{ borderRadius: this.props.trackBarStyle.height * 0.5, flex: 1, backgroundColor: 'white', height: this.props.trackBarStyle.height },
                    { backgroundColor: this.props.trackBarRightColor }]} />

                </View>
                {
                    this.trackBarlayout.x == 0 ? null :
                        <View style={[{
                            height: 20, width: 20, borderRadius: 10, backgroundColor: '#8deeee', position: 'absolute',
                            top: this.trackBarlayout.y + 0.5 * this.trackBarlayout.height - this.layout.y - 0.5 * this.props.thumbStyle.height,
                            left: this.trackBarlayout.x + this.state.leftLength * this.trackBarLength - this.layout.x - this.props.thumbStyle.width * 0.5
                        }, this.props.thumbStyle]}
                            {...this.panResponder.panHandlers}>
                            {this.props.Pic}
                        </View>}
            </View>)
    }
}
Slider.defaultProps = {
    style: { height: 40, width: width * 0.75, alignItems: 'center', justifyContent: 'center' },
    defaultLocation: 0,
    trackBarStyle: { height: 10, width: width * 0.65 },
    trackBarBackgroundColor: '#FFC125',
    trackBarRightColor: 'white',
    thumbStyle: { width: 20, height: 20, backgroundColor: '#8deeee', borderRadius: 10 },
    Pic: <Image />,
    onDrag: () => { },
    endDrag: () => { }

}
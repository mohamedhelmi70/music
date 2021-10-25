import 'react-native-gesture-handler/jestSetup';

jest.useFakeTimers();

jest.mock('react-native-gesture-handler', () =>
    jest.requireActual('../node_modules/react-native-gesture-handler/jestSetup'),
);

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};
    return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-safe-area-context', () => {
    const React = require('react');
    class MockSafeAreaProvider extends React.Component {
        render() {
            const {children} = this.props;
            return React.createElement('SafeAreaProvider', this.props, children);
        }
    }
    return {
        useSafeAreaInsets: () => ({top: 1, right: 2, bottom: 3, left: 4}),
        SafeAreaProvider: MockSafeAreaProvider,
    };
});

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            dispatch: jest.fn(),
            goBack: jest.fn(),
            popToTop: jest.fn(),
        }),
    };
});

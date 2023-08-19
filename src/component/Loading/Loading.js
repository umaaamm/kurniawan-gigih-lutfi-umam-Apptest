import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Modal, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '../../assets/colors';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');
export default function Loading({ loading }) {
    const { contactReducer } = useSelector(
        (selector) => selector,
    );
    return (
        <Modal visible={contactReducer.loading} transparent={true} animationType={'none'}>
            <View style={styles.modalBackground}>
                <View style={[styles.container]}>
                    <ActivityIndicator size="large" color={colors.white} />
                </View>
            </View>
        </Modal>
    );
}

Loading.propTypes = {
    loading: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalBackground: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#00000095',
        height: height,
        width: width,
    },
    backgroudloading: {
        backgroundColor: '#ffffff',
        width: 65,
        height: 65,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
    },
});

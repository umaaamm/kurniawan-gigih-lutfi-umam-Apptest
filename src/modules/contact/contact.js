import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { batch, useDispatch, useSelector } from 'react-redux';
import TextComponent from '../../component/TextComponent/TextComponent';
import { colors } from '../../assets/colors';
import callServicesGetContact from '../../Action/ActionGetContact';
import callServicesPostContact from '../../Action/ActionPostContact';
import callServicesEditContact from '../../Action/ActionEditContact';
import callServicesDeleteContact from '../../Action/ActionDeleteContact';
import { toastConfigUtil } from '../../utils/toastUtils';
import Toast from 'react-native-toast-message';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { launchImageLibrary } from 'react-native-image-picker';
import { setFistNameReq, setLastNameReq, setAgeReq, setPhotoReq, setIdContact } from '../../store/action/contactAction'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';

const Contact = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { height } = Dimensions.get('screen');
    const { contactReducer } = useSelector(
        (selector) => selector,
    );
    const [allContact, setAllContact] = useState([]);
    const [responseImageBase64, setResponseImageBase64] = useState([]);
    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const bottomSheetRef = useRef(BottomSheet || null);
    const [firsName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const snapPoints = useMemo(() => ['25%', '75%'], []);
    const [isEdit, setIsEdit] = useState(false)

    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);

    const handleSheetChanges = useCallback((index) => {
        if (index == 0) {
            handleClosePress()
        }
    }, []);

    const resetAllData = () => {
        setAge('')
        setFirstName('')
        setLastName('')
        setResponseImageBase64('')
        batch(() => {
            dispatch(setFistNameReq(''))
            dispatch(setLastNameReq(''))
            dispatch(setAgeReq(''))
            dispatch(setPhotoReq(''))
            dispatch(setIdContact(''))
        })
    }

    const { submit: getDataContact } = callServicesGetContact({
        onSuccess: (res) => {
            setAllContact(res?.data)
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Gagal Mengambil Data!!, Silahkan Coba Kembali."
            });
        },
        onReject: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Ops!, Terjadi Kesalahan, Silahkan coba kembali."
            });
        }
    })

    const { submit: editContact } = callServicesEditContact({
        onSuccess: async (res) => {
            const result = await getDataContact()
            if (result == true) {
                handleClosePress()
                resetAllData()
            }
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Gagal MengEdit Data!!, Silahkan Coba Kembali."
            });
        },
        onReject: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Ops!, Terjadi Kesalahan, Silahkan coba kembali."
            });
        }
    })

    const { submit: deleteContact } = callServicesDeleteContact({
        onSuccess: async (res) => {
            const result = await getDataContact()
            if (result == true) {
                handleClosePress()
                resetAllData()
            }
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Gagal Menghapus Data!!, Silahkan Coba Kembali."
            });
        },
        onReject: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Ops!, Terjadi Kesalahan, Silahkan coba kembali."
            });
        }
    })


    const { submit: postDataContact } = callServicesPostContact({
        onSuccess: async (res) => {
            const result = await getDataContact()
            if (result == true) {
                handleClosePress()
                resetAllData()
            }
        },
        onError: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Gagal Menyimpan Data!!, Silahkan Coba Kembali."
            });
        },
        onReject: (err) => {
            Toast.show({
                type: 'error',
                text1: "Error",
                text2: "Ops!, Terjadi Kesalahan, Silahkan coba kembali."
            });
        }
    })

    useEffect(() => {
        getDataContact()
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
        setShowBottomSheet(false)
    }, []);

    const saveAction = () => {
        postDataContact()
    }

    const editAction = () => {
        editContact()
    }

    const deleteAction = () => {
        deleteContact()
    }

    const toGalery = async () => {
        const options = {
            selectionLimit: 0,
            mediaType: 'photo',
            includeBase64: true,
        }
        const result = await launchImageLibrary(options);
        if (result.assets[0]?.uri) {
            setResponseImageBase64(result.assets[0]?.uri)
            dispatch(setPhotoReq(result.assets[0]?.uri))
        }
    }

    const setFirstNameFun = (value) => {
        setFirstName(value)
        dispatch(setFistNameReq(value))
    }

    const setLastNameFun = (value) => {
        setLastName(value)
        dispatch(setLastNameReq(value))
    }

    const setAgeFun = (value) => {
        setAge(value)
        dispatch(setAgeReq(value))
    }

    const editTappedEdit = (item) => {
        setIsEdit(true);
        setFirstName(item.firstName)
        setLastName(item.lastName)
        setAge(String(item.age))
        setResponseImageBase64(item.photo)
        batch(() => {
            dispatch(setFistNameReq(item.firstName))
            dispatch(setLastNameReq(item.lastName))
            dispatch(setAgeReq(item.age))
            dispatch(setPhotoReq(item.photo))
            dispatch(setIdContact(item.id))
        })
        setShowBottomSheet(true)
    }


    const addTapped = () => {
        setIsEdit(false);
        setFirstName('')
        setLastName('')
        setAge('')
        setResponseImageBase64('')
        setShowBottomSheet(true)
    }

    const renderContactList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => editTappedEdit(item)}>
                <View style={styles.renderListContainer}>
                    <View style={styles.renderListContent}>

                        {item.photo ? (
                            <Image
                                source={{ uri: item.photo }}
                                style={styles.imageStyle}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/images/Bilbo_baggins.webp')}
                                style={styles.imageStyle}
                            />
                        )}

                        <View style={{ paddingLeft: 10 }}>
                            <TextComponent
                                text={`${item.firstName} ${item.lastName}`}
                                isTitle={true}
                                fontSize={19}
                                fontType='Lato-Bold'
                            />
                            <TextComponent
                                text={item.age}
                                isTitle={false}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const bottomSheetRender = () => {
        return (
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={styles.bottomSheetShadow}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.bottomSheetTitle}>
                        <TextComponent
                            text={isEdit ? 'Edit Contact' : 'Add New Contact'}
                            isTitle={true}
                            fontType='Lato-Bold'
                            fontSize={20} />

                        {isEdit &&
                            <TouchableOpacity onPress={() => deleteAction()}>
                                <TextComponent
                                    text={isEdit ? 'Delete' : ''}
                                    isTitle={true}
                                    fontType='Lato-Bold'
                                    color='red'
                                    fontSize={20} />
                            </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.containerText}>
                        <TextComponent
                            text='First Name'
                            isTitle={false}
                            style={styles.textInputTitle}
                        />
                        <BottomSheetTextInput
                            style={styles.input}
                            placeholder='Enter your first name'
                            onChangeText={(value) => setFirstNameFun(value)}
                            value={firsName}
                            onSubmitEditing={() => { handleSnapPress(1) }}
                        />
                    </View>

                    <View style={styles.containerText}>
                        <TextComponent
                            text='Last Name'
                            isTitle={false}
                            style={styles.textInputTitle}
                        />
                        <BottomSheetTextInput
                            style={styles.input}
                            placeholder='Enter your last name'
                            onChangeText={(value) => setLastNameFun(value)}
                            value={lastName}
                            onSubmitEditing={() => { handleSnapPress(1) }}
                        />
                    </View>

                    <View style={styles.containerText}>
                        <TextComponent
                            text='Age'
                            isTitle={false}
                            style={styles.textInputTitle}
                        />
                        <BottomSheetTextInput
                            style={styles.input}
                            placeholder='Enter your Age'
                            onChangeText={(value) => setAgeFun(value)}
                            value={age}
                            onSubmitEditing={() => { handleSnapPress(1) }}
                        />
                    </View>

                    <View style={styles.containerText}>
                        <TextComponent
                            text='Photo'
                            isTitle={false}
                            style={styles.textInputTitle}
                        />
                        <View style={styles.containerPhoto}>

                            {responseImageBase64 == '' ? (
                                <Image
                                    source={require('../../assets/images/Bilbo_baggins.webp')}
                                    style={styles.photoBottomSheet}
                                />
                            ) : (
                                <Image
                                    source={{ uri: responseImageBase64 }}
                                    style={styles.photoBottomSheet}
                                />
                            )}

                            <TouchableOpacity style={styles.buttonChoosePhoto}
                                onPress={() => toGalery()}>
                                <TextComponent
                                    text='Choose Photo'
                                    isTitle={false}
                                    fontType='Lato-Bold'
                                    color={colors.white}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.buttonSimpan}
                            onPress={() => isEdit ? editAction() : saveAction()}>
                            <TextComponent
                                text={isEdit ? 'Edit' : 'Save'}
                                isTitle={false}
                                fontType='Lato-Bold'
                                color={colors.white}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel}
                            onPress={() => handleClosePress()}>
                            <TextComponent
                                text='Cancel'
                                isTitle={false}
                                fontType='Lato-Bold'
                                color={colors.LIME50}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </BottomSheet>
        )
    }

    return (
        <View style={styles.container(insets)}>
            <View style={styles.titleContainer}>
                <TextComponent
                    text='Create'
                    isTitle={true}
                    fontType='Lato-Bold' />
                <TextComponent
                    text='New Contact'
                    isTitle={true}
                    fontType='Lato-Bold' />
                <TextComponent
                    text='Here is a list of contacts that you have added.'
                    isTitle={false}
                />

                <TouchableOpacity style={styles.buttonAdd}
                    onPress={() => addTapped()}>
                    <TextComponent
                        text='Add'
                        isTitle={false}
                        fontType='Lato-Bold'
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={styles.constainerFlatList(height)}>

                <FlatList
                    data={allContact}
                    style={{ marginTop: 20 }}
                    renderItem={renderContactList}
                >

                </FlatList>

            </View>
            {showBottomSheet ? bottomSheetRender() : null}
            <Toast config={toastConfigUtil} position='bottom' />
        </View>
    );
}

const styles = StyleSheet.create({
    photoBottomSheet: {
        width: 80,
        height: 80,
        borderRadius: 100,
        marginTop: 10
    },
    renderListContainer: {
        backgroundColor: colors.white,
        height: 70,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 10,
        alignContent: 'center',
        alignItems: 'flex-start'
    },
    renderListContent: {
        flexDirection: 'row',
        alignContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    imageStyle: {
        width: 48,
        height: 48,
        borderRadius: 100,
    },
    bottomSheetShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    bottomSheetTitle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        alignContent: 'center'
    },
    containerPhoto: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        alignContent: 'center'
    },
    buttonChoosePhoto: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.LIME50,
        borderWidth: 1,
        width: 130,
        height: 50,
        backgroundColor: colors.LIME50,
        borderRadius: 65,
        marginLeft: 10,
        marginTop: 10
    },
    buttonSimpan: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.LIME50,
        borderWidth: 1,
        height: 50,
        backgroundColor: colors.LIME50,
        borderRadius: 65,
    },
    buttonCancel: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.LIME50,
        borderWidth: 1,
        height: 50,
        backgroundColor: colors.white,
        borderRadius: 65,
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginTop: 40
    },
    buttonAdd: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.LIME50,
        borderWidth: 1,
        width: 100,
        height: 50,
        backgroundColor: colors.LIME50,
        borderRadius: 50,
    },
    constainerFlatList: (height) => ({
        width: '100%',
        backgroundColor: colors.Light25,
        height: height * 0.9,
        marginTop: 30,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    }),
    container: (insets) => ({
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: colors.white
    }),
    containerBS: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20
    },
    input: {
        width: "100%",
        fontFamily: 'Lato-Regular',
        fontSize: 17,
        paddingBottom: 10,
        paddingTop: 5,
        borderBottomColor: colors.Light50,
        borderBottomWidth: 1,
    },
    containerText: {
        borderRadius: 10,
        marginTop: 20,
    },
    textInputTitle: {
        paddingTop: 5,
        paddingRight: 10
    },
    searchIcon: {
        padding: 10,
    },
})

export default Contact;

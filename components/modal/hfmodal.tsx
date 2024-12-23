import {View, Modal, Text, StyleProp, ViewStyle, TextStyle, ScrollView} from 'react-native';
import React, {useContext} from "react";
import RNFS from 'react-native-fs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { ChatButtonWithIcon } from "../button";
import { hfModelProp, hfModelFileProp, FS_FILEPATH, downloadModel, modelDownloadLink } from "..//model/hfmodel";
import { closeButtonStyle, linkButtonStyle } from '../button/style';
import { AppContext } from '../../state/state';

interface HFPopUpProp {
    hfmodel: hfModelProp;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HFModelBlockStyleProp {
    main_div: StyleProp<ViewStyle>;
    header: StyleProp<TextStyle>;
    sec_div: StyleProp<ViewStyle>;
    icon_div: StyleProp<ViewStyle>;
    labels: StyleProp<TextStyle>;
}

const HFModelBlockStyle: HFModelBlockStyleProp = {
    main_div: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "#E8BCB9",
        width: 300, marginBottom: 20, borderRadius: 20,
        padding: 20
    },
    header: {color: '#704264', fontSize: 16, fontWeight: 'bold'},
    sec_div: {flexDirection: 'row', width: "100%", justifyContent: "center"},
    icon_div: {flexDirection: 'row', alignItems: 'center', height: 30, marginTop: 10, marginLeft: 20, marginRight: 20},
    labels: {marginLeft: 10, color: '#61677A', fontSize: 14, fontWeight: 'bold'}
}

interface HFModelBlocksInput {
    modelFile: hfModelFileProp;
    modelID: string;
}

// const HFModelBlocks = ({modelID, modelFile}: HFModelBlocksInput) => {
//     const [isExist, setIsExist] = React.useState(false);
//     const [progress, setProgress] = React.useState(0);
//     const [isDownloading, setIsDownloading] = React.useState(false);
//     const [isComplete, setIsComplete] = React.useState(false);
//     const [isFail, setIsFail] = React.useState(false);

//     const {setFSChange, selected, setSelected, set_model} = useContext(AppContext);

//     // check if exist when not downloading
//     async function checkExist() {
//         console.log(`Is exist flag: ${isExist}`);
//         console.log(`Progress flag: ${progress}`);
//         console.log(`Downloading flag: ${isDownloading}`);
        
//         if (!isDownloading) {
//             const res = await RNFS.exists(`${FS_FILEPATH}/${modelFile.filename}`);
//             setIsExist(res);
//         }
//     }

//     async function removeFile() {
//         try {
//             await RNFS.unlink(`${FS_FILEPATH}/${modelFile.filename}`);
//         } catch (error) {
//             console.error('Error removing file:', error);
//         }
//         setFSChange(true); // notify FS change when a file is removed
//     }

//     // handles state during a download error
//     function checkFail() {
//         if (isFail) {
//             setIsExist(false);
//             setIsDownloading(false);
//             setProgress(0);
//             setIsComplete(false);
//             setIsFail(false);
//             setFSChange(true); // will remove if inert
//         }
//     }

//     // Offload model
//     function offloadModel() {
//         set_model(null);
//         setSelected('');
//     }

//     // render download icon if not exist, and trash icon otherwise
//     // Icons will not render during a download
//     function renderButtons() {
//         if (!isExist) {
//             if (!isDownloading) {
//                 return (
//                     <View style={HFModelBlockStyle.icon_div}>
//                         <ChatButtonWithIcon
//                         icon={<FontAwesome6 name='download' size={20} color={'#61677A'} iconStyle="solid" />}
//                         title='Download'
//                         style={linkButtonStyle}
//                         showText={false}
//                         onPress={() => {
//                             setIsDownloading(true);
//                             downloadModel(modelID, modelFile, setProgress, setIsComplete, setIsFail);
//                         }}
//                         />
//                     </View>
//                 );
//             }
//         } else {
//             if (modelFile.filename === selected) {
//                 return (
//                     <View style={HFModelBlockStyle.icon_div}>
//                         <ChatButtonWithIcon
//                             icon={<FontAwesome6 name='ban' size={20} color={'#AE445A'} iconStyle="solid" />}
//                             title='Offload'
//                             style={linkButtonStyle}
//                             showText={false}
//                             onPress={() => {
//                                 offloadModel();
//                             }}
//                         />
//                     </View>
//                 );
//             } else {
//                 return (
//                     <View style={HFModelBlockStyle.icon_div}>
//                         <ChatButtonWithIcon
//                             icon={<FontAwesome6 name='trash-can' size={20} color={'#61677A'} iconStyle="solid" />}
//                             title='Delete'
//                             style={linkButtonStyle}
//                             showText={false}
//                             onPress={() => {
//                                 removeFile();
//                                 setIsExist(false);
//                             }}
//                         />
//                     </View>
//                 );
//             }
//         }
//     }

//     // render the progress bar once download is selected.
//     function renderDownloadProgressBar() {
//         if (isDownloading) {

//             // if (isComplete) {
//             //     setIsExist(true);
//             //     setIsDownloading(false);
//             //     setProgress(0);
//             //     setIsComplete(false);
//             //     setFSChange(true); // if download successful, notify FS change
//             // }

//             // console.log(progress);
//             return (
//                 <View style={{flexDirection: 'row', width: '100%', padding: 10, justifyContent: "center", alignItems: 'center' }}>
//                     {/* Download Icon */}
//                     <View style={HFModelBlockStyle.icon_div}>
//                         <FontAwesome6 name='download' size={20} color={'#61677A'} iconStyle="solid" />
//                     </View>
//                     {/* Progress Bar */}
//                     <View style={{width: "70%", height: 5, borderRadius: 2, backgroundColor: '#352F44', marginTop: 10}}>
//                         <View style={{width: `${Math.round(progress)}%`, height: 5, borderRadius: 2, backgroundColor: '#678983'}}></View>
//                     </View>
//                 </View>
//             );
//         }
//     }

//     React.useEffect(() => {
//         checkExist();
//         // console.log("\n\n------Exist flag triggered------\n\n");
//     }, [isDownloading]);

//     React.useEffect(() => {
//         checkFail();
//         // console.log("\n\n------Fail flag triggered------\n\n");
//     }, [isFail]);

//     React.useEffect(() => {
//         if (isComplete) {
//             setIsExist(true);
//             setIsDownloading(false);
//             setProgress(0);
//             setIsComplete(false);
//             setFSChange(true); // if download successful, notify FS change
//         }
//     }, [isComplete]);

//     return (
//         <View style={HFModelBlockStyle.main_div}>
//         <Text style={HFModelBlockStyle.header}>{modelFile.filename}</Text>
//         <View style={HFModelBlockStyle.sec_div}>
//             <View style={HFModelBlockStyle.icon_div}>
//                 <FontAwesome6 name='memory' size={20} color={'#61677A'} iconStyle="solid" />
//                 <Text style={HFModelBlockStyle.labels}>{(modelFile.size / 1000000000).toFixed(2)} GB</Text>
//             </View>
//             {renderButtons()}
//         </View>
//         {renderDownloadProgressBar()}
//         </View>
//     );
// }


// ***********************************************************************
// Allows background downloads.
const HFModelBlocks = ({modelID, modelFile}: HFModelBlocksInput) => {
    const [isExist, setIsExist] = React.useState(false);

    const {
        setFSChange, selected, setSelected, set_model,
        downloadManager,
        setDownloadManager
    } = useContext(AppContext);

    // check if exist when not downloading
    async function checkExist() {
        if (!(modelFile.filename in downloadManager)) {
            const res = await RNFS.exists(`${FS_FILEPATH}/${modelFile.filename}`);
            setIsExist(res);
        }
    }

    async function removeFile() {
        try {
            await RNFS.unlink(`${FS_FILEPATH}/${modelFile.filename}`);
        } catch (error) {
            console.error('Error removing file:', error);
        }
        setFSChange(true); // notify FS change when a file is removed
    }

    // handles state during a download error
    function checkFail() {
        // if the key value exists
        if (modelFile.filename in downloadManager) {
            if (downloadManager[modelFile.filename].isFail) {
                setIsExist(false);
                // remove the downloaded model from the global list
                setDownloadManager((prev) => {
                    const { [modelFile.filename]: _, ...rest } = prev; // Destructure and remove the key
                    return rest; // Return the updated object
                });
                setFSChange(true); // will remove if inert
            }
        }
    }

    // Offload model
    function offloadModel() {
        set_model(null);
        setSelected('');
    }

    async function download() {
        try {
            const sess = RNFS.downloadFile({
                fromUrl: modelDownloadLink(modelID, modelFile.filename),
                toFile: `${FS_FILEPATH}/${modelFile.filename}`,
                begin: (res) => {},
                progress: (res) => {
                    const progress = (res.bytesWritten / res.contentLength) * 100;
    
                    // Update the download progress
                    setDownloadManager((prev) => ({
                        ...prev,
                        [modelFile.filename]: {
                            ...prev[modelFile.filename],
                            progress: progress,
                        }
                    }));
    
                    // Mark as complete when the progress exceeds a threshold
                    if (progress > 99.95) {
                        setDownloadManager((prev) => ({
                            ...prev,
                            [modelFile.filename]: {
                                ...prev[modelFile.filename],
                                isComplete: true,
                            }
                        }));
                        setFSChange(true); // important to reflect changes as soon as download completes
                    }
                }
            });
    
            // You can optionally handle the job ID here
            // if (setJobID != null) {
            //   setJobID(sess.jobId);
            // }
    
            // Wait for the download to finish
            // await sess.promise;
    
        } catch (error) {
            console.error('Download failed:', error);
    
            try {
                // Handle failure and remove the partially downloaded file
                await RNFS.unlink(`${FS_FILEPATH}/${modelFile.filename}`);
            } catch (unlinkError) {
                console.error('Error removing file:', unlinkError);
            }
    
            // Update download manager to mark the download as failed
            setDownloadManager((prev) => ({
                ...prev,
                [modelFile.filename]: {
                    ...prev[modelFile.filename],
                    isFail: true,
                }
            }));
        }
    }

    // render download icon if not exist, and trash icon otherwise
    // Icons will not render during a download
    function renderButtons() {
        if (!isExist) {
            if (!(modelFile.filename in downloadManager)) {
                return (
                    <View style={HFModelBlockStyle.icon_div}>
                        <ChatButtonWithIcon
                        icon={<FontAwesome6 name='download' size={20} color={'#61677A'} iconStyle="solid" />}
                        title='Download'
                        style={linkButtonStyle}
                        showText={false}
                        onPress={() => {
                            setDownloadManager((prev) => ({
                                ...prev,
                                [modelFile.filename]: {
                                    progress: 0,
                                    isComplete: false,
                                    isFail: false,
                                },
                                }));
                            download();
                        }}
                        />
                    </View>
                );
            }
        } else {
            if (modelFile.filename === selected) {
                return (
                    <View style={HFModelBlockStyle.icon_div}>
                        <ChatButtonWithIcon
                            icon={<FontAwesome6 name='ban' size={20} color={'#AE445A'} iconStyle="solid" />}
                            title='Offload'
                            style={linkButtonStyle}
                            showText={false}
                            onPress={() => {
                                offloadModel();
                            }}
                        />
                    </View>
                );
            } else {
                return (
                    <View style={HFModelBlockStyle.icon_div}>
                        <ChatButtonWithIcon
                            icon={<FontAwesome6 name='trash-can' size={20} color={'#61677A'} iconStyle="solid" />}
                            title='Delete'
                            style={linkButtonStyle}
                            showText={false}
                            onPress={() => {
                                removeFile();
                                setIsExist(false);
                            }}
                        />
                    </View>
                );
            }
        }
    }

    // render the progress bar once download is selected.
    function renderDownloadProgressBar() {
        if (modelFile.filename in downloadManager) {
            return (
                <View style={{flexDirection: 'row', width: '100%', padding: 10, justifyContent: "center", alignItems: 'center' }}>
                    {/* Download Icon */}
                    <View style={HFModelBlockStyle.icon_div}>
                        <FontAwesome6 name='download' size={20} color={'#61677A'} iconStyle="solid" />
                    </View>
                    {/* Progress Bar */}
                    <View style={{width: "70%", height: 5, borderRadius: 2, backgroundColor: '#352F44', marginTop: 10}}>
                        <View style={{width: `${Math.round(downloadManager[modelFile.filename].progress)}%`, height: 5, borderRadius: 2, backgroundColor: '#678983'}}></View>
                    </View>
                </View>
            );
        }
    }


    // requires a check if the key exists
    React.useEffect(() => {
        checkExist();
    }, [downloadManager]);

    React.useEffect(() => {
        checkFail();
    }, [downloadManager]);

    React.useEffect(() => {
        if (modelFile.filename in downloadManager) {
            if (downloadManager[modelFile.filename].isComplete) {
                setIsExist(true);
                // remove the downloaded model from the global list
                setDownloadManager((prev) => {
                    const { [modelFile.filename]: _, ...rest } = prev; // Destructure and remove the key
                    return rest; // Return the updated object
                });
            }
    }
    }, [downloadManager]);

    return (
        <View style={HFModelBlockStyle.main_div}>
        <Text style={HFModelBlockStyle.header}>{modelFile.filename}</Text>
        <View style={HFModelBlockStyle.sec_div}>
            <View style={HFModelBlockStyle.icon_div}>
                <FontAwesome6 name='memory' size={20} color={'#61677A'} iconStyle="solid" />
                <Text style={HFModelBlockStyle.labels}>{(modelFile.size / 1000000000).toFixed(2)} GB</Text>
            </View>
            {renderButtons()}
        </View>
        {renderDownloadProgressBar()}
        </View>
    );
}
// ***********************************************************


export const HFPopUp = ({hfmodel, visible, setVisible}: HFPopUpProp) => {
    return (
        <Modal 
            animationType="slide"
            visible={visible}
        >
            <View style={{flex: 1, backgroundColor: "#FAF0E6", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                <ChatButtonWithIcon
                    icon={<FontAwesome6 name='xmark' size={30} color={'#704264'} iconStyle="solid" />}
                    title='Close'
                    style={closeButtonStyle}
                    showText={false}
                    onPress={() => {
                        setVisible(!visible)
                    }}
                />
                <ScrollView>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "100%"}}>
                        {hfmodel.files.map((obj, index) => (<HFModelBlocks key={index} modelFile={obj} modelID={hfmodel.id} />))}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
} 
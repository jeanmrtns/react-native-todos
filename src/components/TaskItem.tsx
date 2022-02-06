import React, { useState, useRef } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit.png';

interface TaskItemProps {
    index: number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [editing, setEditing] = useState(false);
    const [editingText, setEditingText] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, editingText);
        setEditing(false);
    }

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View 
                        testID={`marker-${index}`}
                        style={item.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        { item.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput
                        value={editingText}
                        onChangeText={setEditingText}
                        editable={editing}
                        onSubmitEditing={handleSubmitEditing}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                { editing ? (
                    <TouchableOpacity onPress={handleCancelEditing}>
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ): (
                    <TouchableOpacity onPress={handleStartEditing}>
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}
                
                <View style={styles.separator} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    disabled={editing}
                    style={{ paddingHorizontal: 24, opacity: editing ? 0.2 : 1 }}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    separator: {
        marginLeft: 24,
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
    }
  })
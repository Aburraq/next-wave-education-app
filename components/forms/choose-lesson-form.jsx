'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { chooseLessonProgramAction } from '@/actions/lesson/choose-lesson-program-form.action';
import { LessonProgramCard } from '@/components/cards/lesson-program-card';
import styles from '@/styles/components/dashboard/choose-lesson-form.module.scss';

export const ChooseLessonForm = ({ data }) => {
    const [state, action, pending] = useActionState(chooseLessonProgramAction);


    return (
        <form action={action} className={styles.container}>
            <div className={styles.cardsContainer}>
                {data?.map((item, index) => (
                    <div key={index} className={styles.inputGroup}>
                        <input
                            type="checkbox"
                            id={item.lessonProgramId}
                            name="lessonProgramId"
                            className={styles.input}
                            value={item.lessonProgramId}
                        />
                        <label
                            htmlFor={item.lessonProgramId}
                            className={styles.label}
                            title={`Choose Lesson Program - ${item.lessonProgramId}`}
                        >
                            <LessonProgramCard data={item} />
                        </label>
                        {state?.errors?.[item.lessonProgramId] && (
                            <AlertText
                                type="error"
                                text={state?.errors?.[item.lessonProgramId][0]}
                            />
                        )}
                    </div>
                ))}
                {state?.errors?.common && (
                    <AlertText type="error" text={state?.errors?.common} />
                )}
            </div>
            <SubmitButton
                pending={pending}
                text="Choose Lesson Program"
                loadingText="Choosing"
            />
        </form>
    );
};
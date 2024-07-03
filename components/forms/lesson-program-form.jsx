'use client';

import { useActionState } from 'react';
import { AlertText } from '@/components/common/alert-text';
import { SubmitButton } from '@/components/common/submit-button';
import { extractEducationTerms } from '@/utils/functions/extract-education-terms';
import weekdays from '@/data/options/weekday-options.json';
import { MultiSelect } from '@/components/common/multi-select';
import { extractLessons } from '@/utils/functions/extract-lessons';
import { createLessonProgramAction } from '@/actions/lesson/create-lesson-program-form.action';
import styles from '@/styles/form.module.scss';

export const LessonProgramForm = ({ educationTermsData, lessonsData }) => {
    const [state, action, pending] = useActionState(createLessonProgramAction);

    const isEducationTermsData = educationTermsData?.status !== 'error';

    let termOptions = [];

    if (isEducationTermsData) {
        termOptions = extractEducationTerms(educationTermsData);
    }

    return (
        <form action={action} className={styles.form}>
            <div className={styles.inputsContainer}>
                {/* =========== LESSONS MULTIPLE SELECTION =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="lessonIdList" className={styles.label}>
                        Lessons
                    </label>
                    <MultiSelect
                        data={extractLessons(lessonsData)}
                        name="lessonIdList"
                        title="Lessons"
                    />
                    {state?.errors?.lessonIdList && (
                        <AlertText
                            type="error"
                            text={state?.errors?.lessonIdList}
                        />
                    )}
                </div>
                {/* =========== EDUCATION TERMS =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="educationTermId" className={styles.label}>
                        Education Term
                    </label>
                    <select
                        name="educationTermId"
                        id="educationTermId"
                        className={styles.select}
                    >
                        {termOptions.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors?.term && (
                        <AlertText type="error" text={state?.errors?.term} />
                    )}
                </div>
                {/* =========== DAY =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="day" className={styles.label}>
                        Day
                    </label>
                    <select name="day" id="day" className={styles.select}>
                        {weekdays.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {state?.errors?.term && (
                        <AlertText type="error" text={state?.errors?.term} />
                    )}
                </div>
                {/* =========== START TIME =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="startTime" className={styles.label}>
                        Starts At
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        className={styles.input}
                    />
                    {state?.errors?.startTime && (
                        <AlertText
                            type="error"
                            text={state?.errors?.startTime[0]}
                        />
                    )}
                </div>
                {/* =========== END TIME =========== */}
                <div className={styles.inputGroup}>
                    <label htmlFor="stopTime" className={styles.label}>
                        Ends At
                    </label>
                    <input
                        type="time"
                        id="stopTime"
                        name="stopTime"
                        className={styles.input}
                    />
                    {state?.errors?.stopTime && (
                        <AlertText
                            type="error"
                            text={state?.errors?.stopTime[0]}
                        />
                    )}
                </div>
                {state?.errors?.common && (
                    <AlertText type="error" text={state?.errors?.common} />
                )}
            </div>
            <SubmitButton
                pending={pending}
                text="Create Lesson Program"
                loadingText="Creating"
            />
        </form>
    );
};
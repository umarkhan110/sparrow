export function savedStdArray(savedStd) {
    // debugger
    let customSavedStd;
    if (savedStd.length > 0) {
        customSavedStd = savedStd?.map((item) => {
            return item?.first_name
        })
        return customSavedStd;
    }
}
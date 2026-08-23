export function RootErrorLabel({ 
    rootError 
}: {
    rootError: string | undefined
}) {
    return (
        rootError &&
        <label
            className="text-xs absolute top-2.5 text-red-600"
        >
            {rootError}
        </label>
    )
}
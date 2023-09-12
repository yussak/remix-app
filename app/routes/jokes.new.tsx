export default function NewJoke() {
    return (
        <div>
            <p>new joke</p>
            <form method="post">
                <div>
                    <label>
                        Name: <input type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Content: <textarea name="name" />
                    </label>
                </div>
                <div>
                    <button type="submit">
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}
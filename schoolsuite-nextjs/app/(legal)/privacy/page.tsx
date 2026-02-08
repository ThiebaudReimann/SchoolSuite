import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Link
                    href="/"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block font-medium"
                >
                    ← Zurück zur Startseite
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Datenschutzerklärung</h1>

                <section className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Datenschutz auf einen Blick</h2>
                        <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise</h3>
                        <p>
                            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert,
                            wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">2. Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h2>
                        <p>
                            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber.
                            Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3. Wie erfassen wir Ihre Daten?</h2>
                        <p>
                            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln,
                            die Sie in ein Kontaktformular eingeben oder die bei der Registrierung (Firebase Auth) entstehen.
                        </p>
                        <p className="mt-2">
                            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
                            Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">4. Firebase und Hosting</h2>
                        <p>
                            Wir nutzen für unsere Anwendung Firebase (Google Cloud Platform). Firebase hilft uns bei der Authentifizierung von Nutzern,
                            der Bereitstellung der Datenbank (Firestore) und dem Hosting. Hierbei werden Daten auf Servern von Google verarbeitet.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">5. Ihre Rechte</h2>
                        <p>
                            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten
                            personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}

import React from 'react';
import Parent from '../../components/parent/Parent';
import Styles from '../../styles/howToUse/howToUse.module.scss';

function index() {
	return (
		<Parent>
			<div className={Styles.howToUse}>
				<h1>How to use guide.</h1>
				<div className={Styles.guide_wrapper}>
					<p>こんにちは、</p>
					<p>
						This is your guide on how get started with
						KanjiFlashcards!
					</p>
					<p>
						We’ve made this project for people like us for whom
						kanjis are an absolute nightmare. Since flashcards have
						proven to be significantly useful, we thought why not to
						make a dedicated free website for it… So here you have
						it.
					</p>
					<p>
						Anyways, regarding the guide, you can start right off
						just by visiting the homepage where you’ll see a card
						with a kanji in it, that’s the flashcard. You’ll see a
						kanji on the front side of the card. Make a guess
						about meaning/reading of it and then once you think you’ve got
						it right, click on it and it will reveal the meaning,
						kun & on reading of kanji with some examples.
					</p>
					<p>
						To get another kanji, simply click on the “NEXT” button
						which will be below the flashcard and it will give you
						another random kanji of same level that you{"'"}ve selected.
					</p>
					<p>
						If you want to change the kanji level you can do so by
						changing it from the select menu above the flashcard.
					</p>
					<p>
						Pretty fascinating, right? But the best part is yet to
						come...
					</p>
					<strong>
						<h2>
							Get the most out of this project by making and verifying your
							account!
						</h2>
					</strong>
					<p>Follow the process below:</p>
					<p>
						First, go to the SignUp page by clicking the
						corresponding button from the navigation bar at the top
						(Click the menu button if you’re on smartphone).
					</p>
					<p>
						Make an account by providing necessary details. Once
						you’ve made your account a verification email will be
						sent on your email address. Verify your email and come
						back to this website and refresh.
					</p>
					<p>
						If you’ve done the above steps correctly, you’ll see another select menu will appear next to
						“Next” button on the homepage.
					</p>
					<p>
						Now, if you want to bookmark a kanji for later
						evaluation or revision, you can do so by selecting “Bookmarks” from
						that select menu.
					</p>
					<p>
						Now, for the best part, you{"'"}ll see two more options appeared on the menu: {'"'}My lists{'"'} and {'"'}Practice{'"'}. These two options appeared on the Menu are what make the
						core of this project.
					</p>
					<ol>
						<li>
							<strong>1. My Lists:</strong>
							<br />
							<p>
								Here you can make your own custom lists which
								will appear in the list selection menu on the
								homepage. To add kanjis to this list just select
								the name of the list from the select menu.
							</p>
							<p>
								It’s recommended to have just 5-6 list at a
								time. Delete the lists that you don’t use
								anymore. You can delte the items in the list as
								well as the list itself.
							</p>
						</li>
						<li>
							<strong>2. Practice:</strong>
							<br />
							<p>
								Here you can practice the kanjis in two modes:
							</p>
							<ul>
								<li>
									<p>- Guess kanji based on its meaning, or</p>
								</li>
								<li>
									<p>- Guess the meaning of the kanji</p>
								</li>
							</ul>
							<p>
								You can freely choose any list of kanjis that
								you want to practice (it could be a single list
								or multiple). We’ve provided you with basic
								kanji lists based on the JLPT levels(N5, N4, N3,
								N2, N1).
							</p>
						</li>
					</ol>
					<p>
						Since this is a project made by us (college students),
						it’s quite possible that you might come across some{' '}
						<a href="https://techterms.com/definition/bug">bugs</a>.
						So to report the bug or you might wish to share your
						valuable feedbacks/opinions or criticism with us, We’ve
						made a contact form where you’ll need to provide your
						email & username(if not logged in) to submit your
						message. We’ll make sure to go through each one of them
						and will contact you back if necessary.
					</p>
					<p>
						And that’s it. All the best for your journey ahead. We
						hope that this project will make your journey to learn
						Japanese a little easy.
					</p>
					<p>
						Any comment, feedback, opinion, criticism, suggestion is welcomed!
						So feel free to share it with us through the contact
						form.
					</p>
					<p>
						<strong>では、一緒に頑張りましょう！</strong>
					</p>
				</div>
			</div>
		</Parent>
	);
}

export default index;

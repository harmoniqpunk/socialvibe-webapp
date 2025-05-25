<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	const steps = [
		{
			number: '1',
			title: 'Install the Application',
			description: ``,
			platforms: [
				{
					href: 'https://www.oculus.com/experiences/quest/',
					label: 'Meta Quest',
					icon: 'oculus'
				},
				{
					href: 'https://www.apple.com/apple-vision-pro/',
					label: 'VisionOS',
					icon: 'visionos'
				},
				{
					href: 'https://play.google.com',
					label: 'Android',
					icon: 'android'
				},
				{
					href: 'https://apps.apple.com',
					label: 'iOS',
					icon: 'ios'
				}
			]
		},
		{
			number: '2',
			title: 'Set your Account',
			description: `If you don't already have an Extropia, Apple or Google account, you can instantly create one without classical friction. Click create an account, and you'll be set up in no time.`
		},
		{
			number: '3',
			title: 'Explore and Build',
			description: `Start exploring and creating emergent worlds. Here's how:

1. Browse the marketplace for existing environments or start from scratch.
2. Select assets (3D models, textures, sounds) from the marketplace or upload your own.
3. Define policies that govern the environment's behavior.
4. Use the in-app builder to place assets and configure the environment.
5. Test your environment in real-time.
6. Save your environment for personal use or publish it to the marketplace.`
		},
		{
			number: '4',
			title: 'Train Agents',
			description: `Begin training agents within your environments:

1. Choose an agent type (e.g., robot, character, vehicle).
2. Set up training scenarios in your environment.
3. Define reward functions to guide the agent's learning.
4. Start the training process and monitor progress.
5. Fine-tune the agent's behavior as needed.
6. Save the trained control policies as RGB smart contracts.
7. Optionally, publish your skills to the marketplace.`
		},
		{
			number: '5',
			title: 'Transfer to Reality',
			description: `Transfer abilities from simulation to real-world applications with Sim2Real interfaces:

1. Select a compatible Sim2Real interface from the marketplace.
2. Connect your trained agent to the Sim2Real interface.
3. Configure any necessary hardware connections.
4. Run initial tests in a controlled environment.
5. Gradually increase the complexity of real-world tasks.
6. Fine-tune the agent's performance for real-world conditions.
7. Deploy your Sim2Real solution in production environments.`
		},
		{
			number: '6',
			title: 'Monetize',
			description: `Turn your creations into income on the marketplace:

1. Set competitive prices for your environments, assets, skills, or Sim2Real interfaces.
2. Choose payment options: Webcash (0% fee), Bitcoin Lightning Network (<1% fee), or credit cards (variable fees).
3. Define usage terms (e.g., transferability, territories, commercial use).
4. Publish your items on the marketplace.
5. Promote your creations within the OS4 community.
6. Receive payments minus our 3% marketplace fee.
7. Withdraw funds to your preferred payment method.`
		}
	];
</script>

<section class="positive-section min-h-screen flex flex-col justify-between">
	<div class="w-full max-w-[95%] xl:max-w-[1600px] mx-auto px-6 flex-grow flex items-center">
		<div class="w-full">
			<h1 class="text-5xl md:text-6xl lg:text-7xl mb-12 text-light-positive-primary dark:text-dark-positive-primary tracking-wider text-center">
				Get Started with <span class="font-light">OS<sup class=" text-light-positive-glow dark:text-dark-positive-glow text-3xl md:text-4xl lg:text-5xl">4</sup></span>
			</h1>
			<p class="text-xl md:text-2xl lg:text-3xl text-light-positive-text dark:text-dark-positive-text text-center mb-16">
				Get started with OS4 in a few easy steps.
			</p>

			<!-- Steps -->
			<div class="space-y-16">
				{#each steps as step, index}
					<div class="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
						<!-- Step Number -->
						<div class="flex-shrink-0 mb-4 md:mb-0">
							<div class="w-16 h-16 rounded-full bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text flex items-center justify-center text-3xl font-semibold">
								{step.number}
							</div>
						</div>

						<!-- Step Content -->
						<div class="flex-grow">
							<h2 class="text-3xl md:text-4xl font-bold mb-4 text-light-positive-primary dark:text-dark-positive-primary text-center md:text-left">
								{step.title}
							</h2>
							<p class="text-lg md:text-xl text-light-positive-text dark:text-dark-positive-text mb-6 leading-relaxed whitespace-pre-line">
								{@html step.description}
							</p>

							<!-- Conditional Rendering for Platforms (only for step 1) -->
							{#if index === 0 && step.platforms}
								<div class="flex flex-col items-start pt-12 w-full">
									<div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
										<Button href="https://www.oculus.com/experiences/quest/" target="_blank" rel="noopener noreferrer" 
												class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text hover:bg-light-positive-button-hover-bg dark:hover:bg-dark-positive-button-hover-bg hover:text-light-positive-button-hover-text dark:hover:text-dark-positive-button-hover-text transition-colors duration-200 rounded-full">
											<div class="flex items-center justify-center space-x-2 w-4/5">
												<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 32 32">
													<path fill="currentColor" d="M24.182 18.599a3.3 3.3 0 0 1-1.411.552c-.51.083-1.016.068-1.521.068h-10.5c-.51 0-1.016.021-1.526-.068a3.4 3.4 0 0 1-1.411-.552a3.18 3.18 0 0 1-1.365-2.604a3.13 3.13 0 0 1 1.37-2.599a3.26 3.26 0 0 1 1.396-.557c.5-.083 1-.083 1.526-.083h10.5c.5 0 1.016-.016 1.516.063s.984.26 1.401.542a3.11 3.11 0 0 1 1.365 2.599c0 1.036-.526 2-1.38 2.599zm4.229-10.073a9.6 9.6 0 0 0-3.818-1.865a12 12 0 0 0-2.432-.307c-.599-.021-1.198-.01-1.818-.01h-8.661c-.609 0-1.224-.01-1.833.01c-.823.026-1.63.109-2.432.307a9.7 9.7 0 0 0-3.818 1.865A9.56 9.56 0 0 0 0 16a9.58 9.58 0 0 0 3.583 7.474a9.7 9.7 0 0 0 3.823 1.87c.802.193 1.609.281 2.432.302c.599.021 1.198.016 1.818.016h8.661c.599 0 1.219.005 1.818-.016c.823-.021 1.62-.109 2.417-.302a9.9 9.9 0 0 0 3.823-1.87C30.682 21.651 32 18.906 32 16s-1.318-5.656-3.589-7.474" />
												</svg>
												<span class="text-base md:text-lg">Oculus</span>
											</div>
										</Button>
										<Button disabled 
												class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-muted dark:bg-dark-positive-muted text-light-positive-muted-text dark:text-dark-positive-muted-text cursor-not-allowed rounded-full">
											<div class="flex items-center justify-center space-x-2 w-4/5">
												<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24">
													<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7q1.715 0 3.275.104q1.526.101 2.798.42q1.22.304 2.119.909a3.9 3.9 0 0 1 1.328 1.531c.326.657.48 1.48.48 2.466q.002 1.51-.574 2.707q-.562 1.17-1.537 1.848a3.7 3.7 0 0 1-2.16.66q-.764.002-1.382-.21a6 6 0 0 1-1.17-.548a19 19 0 0 1-1.045-.695a9 9 0 0 0-1.001-.63a2.4 2.4 0 0 0-1.13-.301c-.373 0-.75.097-1.132.3q-.475.255-1 .63q-.482.345-1.047.695a5.8 5.8 0 0 1-1.168.548q-.62.212-1.378.21a3.7 3.7 0 0 1-2.165-.659q-.976-.68-1.537-1.848q-.576-1.196-.574-2.709c-.004-.98.15-1.802.477-2.46a3.9 3.9 0 0 1 1.33-1.531q.9-.604 2.12-.907a16 16 0 0 1 2.8-.423Q10.287 7 12 7" />
												</svg>
												<span class="text-base md:text-lg">VisionOS</span>
											</div>
										</Button>
										<Button href="https://play.google.com" target="_blank" rel="noopener noreferrer" 
												class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text hover:bg-light-positive-button-hover-bg dark:hover:bg-dark-positive-button-hover-bg hover:text-light-positive-button-hover-text dark:hover:text-dark-positive-button-hover-text transition-colors duration-200 rounded-full">
											<div class="flex items-center justify-center space-x-2 w-4/5">
												<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
													<g fill="none" fill-rule="evenodd">
														<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
														<path fill="currentColor" d="M20 14v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5zM12 3c1.33 0 2.584.324 3.687.899l.606-.606a1 1 0 1 1 1.414 1.414l-.35.35A7.98 7.98 0 0 1 20 11v1H4v-1a7.98 7.98 0 0 1 2.644-5.942l-.351-.35a1 1 0 0 1 1.414-1.415l.606.606A8 8 0 0 1 12 3M9 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m6 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
													</g>
												</svg>
												<span class="text-base md:text-lg">Android</span>
											</div>
										</Button>
										<Button disabled
												class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-muted dark:bg-dark-positive-muted text-light-positive-muted-text dark:text-dark-positive-muted-text cursor-not-allowed rounded-full">
											<div class="flex items-center justify-center space-x-2 w-4/5">
												<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
													<path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
												</svg>
												<span class="text-base md:text-lg">iOS</span>
											</div>
										</Button>
									</div>
								</div>
							{/if}
						</div>
					</div>

					<!-- Divider -->
					<hr class="border-t border-light-positive-muted dark:border-dark-positive-muted my-12" />
				{/each}
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	:global(body) {
		@apply bg-light-positive-background dark:bg-dark-positive-background text-light-positive-text dark:text-dark-positive-text;
		font-family: 'Raleway', sans-serif;
	}

	h1,
	h2 {
		@apply text-light-positive-primary dark:text-dark-positive-primary;
	}

	p {
		@apply text-light-positive-text dark:text-dark-positive-text;
	}

	hr {
		@apply border-light-positive-muted dark:border-dark-positive-muted;
	}
</style>





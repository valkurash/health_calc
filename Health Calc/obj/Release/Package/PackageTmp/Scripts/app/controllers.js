


angular.module('healthCalc')
	.controller('HealthController', ['$scope', '$timeout', function ($scope, $timeout) {
	
		//показ "Перезвонить мне"
		$scope.showCallbackBlock = false;
		$scope.showPromoBlock = false;
		//настройка календаря
		$scope.today = new Date();
		$scope.today.setHours(0, 0, 0, 0);
		$scope.dateOptions = {
			'show-weeks': false,
			'starting-day':1
		}
		//обратный звонок
		$scope.callback = {
			date: $scope.today,
			callbackDpOpened: false
		}
		//промокод
		$scope.promo = {
			promoCode: ''
}
		$scope.buyStep ='calculate'; //'insurer';

		//показ loader
		$scope.showLoader = false;
		//дисаблить кнопку покупки полиса
		$scope.disablePolicy = true;
		$scope.totalPolicyPrice = 0;

		//#region страховки
		$scope.preparedInsurance = [
			{
				key: 'health',
				type: 'calculate',
				title: 'Конструктор полиса на любой случай',
				helpText: '<h3>Конструктор полиса на любой случай</h3> Составьте свой полис из необходимых вам компонентов и расчитайте всё самостоятельно.'
			},
			{
				key: 'yourprice',
				type: 'calculate',
				title: 'По стоимости полиса',
				helpText: '<h3>По стоимости полиса</h3> При таком типе расчёта, вы отталкиваетесь от своих финансовых возможностей.'
			},
			{
				key: 'active',
				type: 'prepared',
				title: 'Активным людям',
				helpText: '<h3>Активным людям</h3> Подойдет тому, кто предпочитает активный отдых. В страховку, помимо основных, включен риск получения травмы в результате несчастного случая, а также риски, связанные с занятиями активными видами спорта.',
				peopleText: '1 взрослый в возрасте до 60 лет',
				insuredSum: '1 000 000'
			},
			{
				key: 'professional',
				type: 'prepared',
				title: 'Спортсмену',
				helpText: '<h3>Спортсмену</h3> Подойдет как для любителя, так и для спортсмена, регулярно принимающего участие в соревнованиях. В страховку, помимо основных, включены риски, связанные с занятиями активным или профессиональным спортом по всему миру.',
				peopleText: '1 взрослый в возрасте до 60 лет',
				insuredSum: '1 000 000'
			},
			{
				key: 'crisis',
				type: 'prepared',
				title: 'От последствий фин. кризиса',
				helpText: '<h3>От последствий фин. кризиса</h3> Подойдет любому, кто хочет быть уверен в своем материальном положении даже в самое неспокойное время в экономике.',
				peopleText: '1 взрослый в возрасте до 60 лет',
				insuredSum: '300 000'

			},
			{
				key: 'family',
				type: 'prepared',
				title: 'Для всей семьи',
				helpText: '<h3>Для всей семьи</h3> Подойдет для молодой семьи с ребенком. В страховку включены все основные риски.',
				peopleText: '2 взрослых в возрасте до 60 лет и 1 ребенок',
				insuredSum: '500 000'

			},
			{
				key: 'danger',
				type: 'prepared',
				title: 'Работникам опасных профессий',
				helpText: '<h3>Работникам опасных профессий</h3> Подойдет для шахтера, пожарного, электрика, дальнобойщика, вальщика леса, высотного мойщика окон и даже сапера. В страховку, помимо основных, включены риски получения травм и временной нетрудоспособности в результате несчастного случая.',
				peopleText: '1 взрослый в возрасте до 60 лет',
				insuredSum: '500 000'
			},
			{
				key: 'parents',
				type: 'prepared',
				title: 'Пожилым родителям',
				helpText: '<h3>Пожилым родителям</h3> Подойдет для двоих взрослых в возрасте от 60 до 74 лет. В страховку включены все основные риски.',
				peopleText: '2 взрослых в возрасте от 60 до 74 лет включительно',
				insuredSum: '1 000 000'
			},
			{
				key: 'hunter',
				type: 'prepared',
				title: 'Охотникам, рыбакам, грибникам',
				helpText: '<h3>Охотникам, рыбакам, грибникам</h3> Подойдет рыболову, охотнику или грибнику. В страховку, помимо основных, включен риск получения травмы в результате несчастного случая. Действует на территории РФ.',
				peopleText: '1 взрослый в возрасте до 60 лет',
				insuredSum: '500 000'
			},
			{
				key: 'children',
				type: 'prepared',
				title: 'Детям',
				helpText: '<h3>Детям</h3> Счастливое и безоблачное детство вашего ребёнка — это не только интересные прогулки, развивающие игры и общение со сверстниками. Это ещё и уверенность, что в любой ситуации, что бы ни случилось, мама и папа всегда помогут и защитят. Часть этой защиты мы готовы взять на себя, мы собрали для вас самое нужное.',
				peopleText: '1 ребенок в возрасте до 11 лет',
				insuredSum: '500 000'
			}
		];

		$scope.insuranceContent = [
			{ key: 'world', applyto: ['professional'], title: 'Действует по всему миру', helpText: '' },
			{ key: 'active', applyto: ['active'], title: 'Активные виды спорта', helpText: 'Авиа-, авто- и мотоспорт, конный спорт, воздушные виды спорта (парашютизм, дельтапланеризм, парапланеризм и др.), водные виды спорта, в том числе: подводное плавание и водный туризм; горные лыжи и сноуборд, контактные единоборства, альпинизм, скалолазание, горный туризм,  стрельба, участие в охоте с применением любого вида оружия.' },
			{ key: 'jobloss', applyto: ['crisis'], title: 'Потеря работы', helpText: 'Страхование от риска потери  постоянного дохода при увольнении в связи с сокращением или ликвидацией предприятия, по состоянию здоровья.' },
			{ key: 'disability', applyto: ['danger'], title: 'Временная нетрудоспособность в результате несчастного случая', helpText: 'Страховая выплата в случае наступления временной нетрудоспособности в результате несчастного случая производится в размере 0,5% от страховой суммы за каждый день нетрудоспособности, начиная с 10 (десятого) дня, но не более чем за 100 (сто) дней.' },
			{ key: 'injury', applyto: ['active', 'danger', 'hunter', 'children'], title: 'Травма в результате несчастного случая', helpText: 'Получение Застрахованным травмы в результате несчастного случая.' },
			{ key: 'invalid', applyto: ['health', 'yourprice', 'active', 'professional', 'crisis', 'family', 'danger', 'parents', 'hunter', 'children'], title: 'Инвалидность I, II, III групп в результате несчастного случая', helpText: 'Риск получения инвалидности. Инвалидность - нарушение здоровья Застрахованного со стойким расстройством функций организма, обусловленное заболеваниями или последствиями травм, приводящее к ограничению жизнедеятельности и вызывающее необходимость социальной защиты Застрахованного. Порядок установления инвалидности определяется в соответствии с действующим законодательством Российской Федерации. Факт установления инвалидности подтверждается справкой Медико-социальной экспертной комиссии (МСЭК) об установлении группы инвалидности (категории «ребенок-инвалид» для  лиц в возрасте до 18 лет).' },
			{ key: 'death', applyto: ['health', 'yourprice', 'active', 'professional', 'crisis', 'family', 'danger', 'parents', 'hunter', 'children'], title: 'Смерть в результате несчастного случая', helpText: 'Риск смерти Застрахованного, наступившей в результате несчастного случая.' }
		];

		$scope.accidents = [
			{ key: 'accidentinjury', name: 'accidentInjury', title: 'Травма в результате несчастного случая', helpText: 'Получение Застрахованным травмы в результате несчастного случая.' },
			{ key: 'injury', name: 'temporaryDisabilityDueAccident', title: 'Временная нетрудоспособность в результате несчастного случая', helpText: 'Страховая выплата в случае наступления временной нетрудоспособности в результате несчастного случая производится в размере 0,5% от страховой суммы за каждый день нетрудоспособности, начиная с 10 (десятого) дня, но не более чем за 100 (сто) дней.' },
			{ key: 'hospitalization', name: 'hospitalization', title: 'Госпитализация (до 50 000<span class="rouble"></span>)', helpText: 'Госпитализация Застрахованного в результате:<ul><li>произошедшего в период действия Договора страхования несчастного случая;</li><li>диагностированной в период действия Договора страхования болезни.</li></ul>' }
		];
		$scope.sports = [
			{ key: 'no-sport', name: 'sportActivity', value: 'none', title: 'Не занимаюсь', helpText: '' },
			{ key: 'sport-extreem', name: 'sportActivity', value: 'extreme', title: 'Активные виды спорта', helpText: 'Авиа-, авто- и мотоспорт, конный спорт, воздушные виды спорта (парашютизм, дельтапланеризм, парапланеризм и др.), водные виды спорта, в том числе: подводное плавание и водный туризм; горные лыжи и сноуборд, контактные единоборства, альпинизм, скалолазание, горный туризм,  стрельба, участие в охоте с применением любого вида оружия.' },
			{ key: 'sport-prof', name: 'sportActivity', value: 'professional', title: 'Профессиональный спорт', helpText: 'Занятия спортом на профессиональном уровне, включая соревнования и тренировки.' }
		];
		//период для комфортной и окончательной суммы
		$scope.sumPeriod = [
			{ value: 'monthly', text: 'в месяц' },
			{ value: 'annual', text: 'в год' }
		];
		//#endregion

		//ключ выбранной страховки
		$scope.chosenInsurance = 'health';
		//выбранный тип страховки (конструктор/шаблон)
		$scope.chosenInsuranceType = 'calculate';
		//текущая страховкая
		$scope.currentInsurance = $scope.preparedInsurance[0];
		//количество людей
		$scope.personsQuantity= {
		adultsQuantity: 0,
		kidsQuantity:0,
		pensionersQuantity: 0
		}

		//значение слайдера в конструкторе полиса
		$scope.healthSlider = {
			value: 500000,
			minValue: 250000,
			maxValue: 2000000,
			stepValue: 1000,
			refreshCounter: 0
		}
		//значение слайдера в "по стоимости"
		$scope.yourpriceSlider = {
		value : 100,
		minValue : 100,
		maxValue : 700,
		stepValue: 10,
		refreshCounter:0
		}
		//сумма на каждого застрахованного в "по стоимости"
		$scope.sumForEach = 250000;

		//выбранные периоды
		$scope.selectedTotalSumPeriod = $scope.sumPeriod[0];
		$scope.selectedComfortSumPeriod = $scope.sumPeriod[0];
		//выбор периода из dropdown
		$scope.chooseTotalPerion = function (value) {
			switch (value) {
				case 'monthly':
					$scope.selectedTotalSumPeriod = $scope.sumPeriod[0];
					break;
				case 'annual':
					$scope.selectedTotalSumPeriod = $scope.sumPeriod[1];
					break;
			}
		}
		$scope.chooseComfortPerion = function (value) {
			if (value !== $scope.selectedComfortSumPeriod.value) {
				switch (value) {
					case 'monthly':
						$scope.selectedComfortSumPeriod = $scope.sumPeriod[0];

						$scope.yourpriceSlider.minValue = 100;
						$scope.yourpriceSlider.maxValue = 700;
						$scope.yourpriceSlider.stepValue = 10;
						$scope.yourpriceSlider.value = 100;
						$scope.yourpriceSlider.refreshCounter++;
						break;
					case 'annual':
						$scope.selectedComfortSumPeriod = $scope.sumPeriod[1];

						$scope.yourpriceSlider.minValue = 1100;
						$scope.yourpriceSlider.maxValue = 7000;
						$scope.yourpriceSlider.stepValue = 10;
						$scope.yourpriceSlider.value = 1100;
						$scope.yourpriceSlider.refreshCounter++;
						break;
				}
			}


		}
		
		$scope.checkBoxes = {
			//распространяется по всему миру
			extendToWholeWorld: false,
			//потеря работы
			jobLoss: false
		}
		
		//блок с дополнительными рисками
		$scope.additionalOpen = false;
		$scope.accidentsValues = {
			accidentInjury: false,
			temporaryDisabilityDueAccident: false,
			hospitalization: false
		};
		$scope.radios= {
		sportActivity: 'none',
		//домосед/активный
		switchChildType: 'active',
		switchChildCount: 'one'
		}
		


		//выбор типа полиса
		$scope.chooseInsuranse = function (kind) {
			$scope.$parent.toggleGeneralPopup(false);
			if (kind) {
				$scope.buyStep = 'calculate';
				$scope.chosenInsurance = kind;
				$scope.currentInsurance = false;
				for (var i = 0; i < $scope.preparedInsurance.length; i++) {
					if ($scope.preparedInsurance[i].key === kind) {
						$scope.currentInsurance = $scope.preparedInsurance[i];
						break;
					}
				}
				$scope.chosenInsuranceType = $scope.currentInsurance.type;

				switch ($scope.chosenInsurance) {
					case 'health':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'yourprice':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'active':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'professional':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						$scope.radios.sportActivity = 'extreme';
						break;
					case 'crisis':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'family':
						$scope.personsQuantity.adultsQuantity = 2;
						$scope.personsQuantity.kidsQuantity = 1;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'danger':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'parents':
						$scope.personsQuantity.adultsQuantity = 0;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 2;
						break;
					case 'hunter':
						$scope.personsQuantity.adultsQuantity = 1;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
					case 'children':
						$scope.personsQuantity.adultsQuantity = 0;
						$scope.personsQuantity.kidsQuantity = 1;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;			
					default:
						$scope.personsQuantity.adultsQuantity = 0;
						$scope.personsQuantity.kidsQuantity = 0;
						$scope.personsQuantity.pensionersQuantity = 0;
						break;
				}

			} else {
				$scope.chosenInsurance = '';
				$scope.chosenInsuranceType = '';
				$scope.currentInsurance = false;
				$scope.personsQuantity.adultsQuantity = 0;
				$scope.personsQuantity.kidsQuantity = 0;
				$scope.personsQuantity.pensionersQuantity = 0;

			}

		}

		//отображения списка "что входит в страховку"
		$scope.filterByInsurance = function (item) {
			if (item.applyto.indexOf($scope.chosenInsurance) > -1) {
				return true;
			}
			return false;
		}

		var showLoaderStab = function () {
			$scope.showLoader = true;

			var hideLoader = function () {
				$scope.showLoader = false;
			}
			$timeout(hideLoader, 500);
			//$http.get()
		}
		var disablePolicyStab = function () {
			$scope.disablePolicy = true;

			var enablePolicy = function () {
				if ($scope.personsQuantity.adultsQuantity + $scope.personsQuantity.kidsQuantity + $scope.personsQuantity.pensionersQuantity>0) {
					$scope.totalPolicyPrice = Math.floor(Math.random() * (10000 - 200 + 1)) + 200;
					$scope.disablePolicy = false;
				} else {
					$scope.totalPolicyPrice = 0;
				}

			}
			$timeout(enablePolicy, 500);

		}

		//#region промокод


		$scope.submitPromoForm = function (isValid) {
			$scope.submittedPromoForm = true;
			if (isValid) {
				if ($scope.promo.promoCode === 'pass') {
					$scope.invalidPromoCode = false;
					$scope.disablePolicy = true;

					var enablePolicy = function () {
						var price = parseInt($scope.totalPolicyPrice);
						$scope.totalPolicyPrice = price - Math.round(price/2);

						$scope.disablePolicy = false;
					}
					$timeout(enablePolicy, 500);
				} else {
					$scope.invalidPromoCode = true;
				}
			}
		}
		//#endregion

		//изменение переменных
		$scope.$watch('currentInsurance', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				showLoaderStab();
			}
		});
		$scope.$watch('personsQuantity.adultsQuantity', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('personsQuantity.kidsQuantity', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('personsQuantity.pensionersQuantity', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('healthSlider.value', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('yourpriceSlider.value', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('selectedComfortSumPeriod', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('selectedTotalSumPeriod', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('checkBoxes.extendToWholeWorld', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('accidentsValues.accidentInjury', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('accidentsValues.temporaryDisabilityDueAccident', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('accidentsValues.hospitalization', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('checkBoxes.jobLoss', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('radios.sportActivity', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('radios.switchChildType', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});
		$scope.$watch('radios.switchChildCount', function (newValue, oldValue) {
			if (newValue !== oldValue) {
				disablePolicyStab();
			}
		});


		var numeralHelper=function(index) {
			switch (index) {
				case 1:return 'Первый';
				case 2:return 'Второй';
				case 3:return 'Третий';
				case 4:return 'Четвертый';
				case 5:return 'Пятый';
				case 6:return 'Шестой';
				case 7:return 'Седьмой';
				case 8:return 'Восьмой';
				case 9:return 'Девятый';
				case 10:return 'Десятый';
				default:return index;
			}
		}

		$scope.insuredPerson= [];
		$scope.changeBuyStep = function (step) {
			if (step === 'insurer' && $scope.totalPolicyPrice > 0) {
				var count = parseInt($scope.personsQuantity.adultsQuantity) + parseInt($scope.personsQuantity.kidsQuantity) + parseInt($scope.personsQuantity.pensionersQuantity);
				for (var i = $scope.insuredPerson.length; i < count; i++) {
					var title = numeralHelper(i + 1) + ' застрахованный';
					$scope.insuredPerson.push(
						{
							title: title,
							birthdayDpOpened: false,
							birthdayMin: seventyFour,
							birthdayMax: eighteen,
							birthday: '',//$.datepicker.formatDate("dd.mm.yy", eighteen),
							firstname: '',
							lastname: '',
							patronymic: ''
						}
						);
				}
				$scope.buyStep = step;

			}
			else if (step === 'calculate') {
				$scope.buyStep = step;
			}

		}

		//#region Страхователь
		$scope.latinNamePattern = /^[A-Z][a-z]+$/;
		$scope.onlyNumbersPattern = /^\d+$/;
		$scope.passportPattern = /^\d{2}\s\d{2}\s\d{6}$/;
		$scope.phonePattern = /^\+7\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}$/;
		$scope.emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w{2,}([-.]\w+)*$/;

		var day = $scope.today.getDate();
		var week = new Date((new Date()).setDate(day + 7));
		week.setHours(0, 0, 0, 0);
		var month = new Date((new Date()).setDate(day + 30));
		month.setHours(0, 0, 0, 0);
		var year = $scope.today.getFullYear();
		var yearAdult = year - 18;
		var yearAdultMax = year - 74;
		var eighteen = new Date((new Date()).setFullYear(yearAdult));
		eighteen.setHours(0, 0, 0, 0);
		var seventyFour = new Date((new Date()).setFullYear(yearAdultMax));
		seventyFour.setHours(0, 0, 0, 0);
		var lastYear = new Date((new Date()).setFullYear(year - 1));
		var minDateIssue = new Date((new Date()).setFullYear(year - 60));
		minDateIssue.setHours(0, 0, 0, 0);



		$scope.genders = [
			{ key: 'male', name: 'Gender', value: 'Мужчина', title: 'Мужчина' },
			{ key: 'female', name: 'Gender', value: 'Женщина', title: 'Женщина' }
		];
		$scope.insurer = {
			startInsureDpOpened: false,
			startInsureDateMin: week,
			startInsureDateMax: month,
			startInsureDate: '',
			birthdayDpOpened: false,
			birthdayMin: seventyFour,
			birthdayMax: eighteen,
			birthday: '',
			dateIssueDpOpened: false,
			dateIssueMin: minDateIssue,
			dateIssueMax: $scope.today,
			dateIssue: '',
			phone: '',
			email: '',
			firstname: '',
			lastname: '',
			patronymic: '',
			gender: 'Мужчина',
			passportNumber: '',
			passportIssued: '',
			sameAddress: false,
			includeSelf: false,
			agreement: true,
			monthly: true,
			regAddress: {
				city: '',
				street: '',
				house: '',
				flat:''
			},
			resAddress: {
				city: '',
				street: '',
				house: '',
				flat: ''
			}
		}

		
		$scope.includeResidence = function () {
			if ($scope.insurer.sameAddress) {
				$scope.insurer.resAddress.city = $scope.insurer.regAddress.city;
				$scope.insurer.resAddress.street = $scope.insurer.regAddress.street;
				$scope.insurer.resAddress.house = $scope.insurer.regAddress.house;
				$scope.insurer.resAddress.flat = $scope.insurer.regAddress.flat;
			} else {
				$scope.insurer.resAddress.city = '';
				$scope.insurer.resAddress.street = '';
				$scope.insurer.resAddress.house ='';
				$scope.insurer.resAddress.flat ='';
			}
			
		}
		$scope.includeInsurer = function () {
			if ($scope.insurer.includeSelf) {
				$scope.insuredPerson[0].firstname = $scope.insurer.firstname;
				$scope.insuredPerson[0].lastname = $scope.insurer.lastname;
				$scope.insuredPerson[0].patronymic = $scope.insurer.patronymic;
				$scope.insuredPerson[0].birthday = $scope.insurer.birthday;
			} else {
				$scope.insuredPerson[0].firstname = '';
				$scope.insuredPerson[0].lastname = '';
				$scope.insuredPerson[0].patronymic = '';
				$scope.insuredPerson[0].birthday = '';
			}

		}
		
		$scope.submitInsurerForm=function(isValid) {
			$scope.submittedInsurerForm = true;
			if (isValid) {
				debugger;
			}
		}

		//#endregion

	}
	]);

//контроллер для теста
angular.module('healthCalc').controller('BlogListController',
['$rootScope', '$scope', 'WebsiteService',
function ($rootScope, $scope, WebsiteService) {
	var setup = function (pageNumber) {
		WebsiteService
				.load()
				.then(function (websiteResource) {
					return websiteResource.$get('blogs', { 'page': pageNumber, 'size': 10, 'sort': null });
				})
				.then(function (resource) {
					$scope.page = resource.page;
					$scope.page.currentPage = $scope.page.number + 1;
					return resource.$get('blogPostList');
				})
				.then(function (blogPostList) {
					$scope.blogs = blogPostList;
					blogPostList.forEach(function (blog) {
						// load author profile
						blog.$get('author').then(function (author) {
							blog.author = author;
						});

					});
				})
		;

	};

	setup(0);
}
]);